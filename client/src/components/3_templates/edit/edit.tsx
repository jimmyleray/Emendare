import React from 'react'
import { Redirect } from 'react-router-dom'
import {
  Amend,
  Box,
  Button,
  Buttons,
  Column,
  Columns,
  Icon,
  UserContext,
  Hero,
  ApiContext
} from '../../../components'
import { path } from '../../../config'
import { debounce } from 'lodash'
import * as JsDiff from 'diff'

interface IEditProps {
  data: any
}

export const Edit = ({ data }: IEditProps) => {
  const { isConnected } = React.useContext(UserContext)
  const { Socket } = React.useContext(ApiContext)

  const [amendName, setAmendName] = React.useState('')
  const [amendDescription, setAmendDescription] = React.useState('')
  const [redirectToAmend, setRedirectToAmend] = React.useState(false)
  const [initialValue] = React.useState(data ? data.actual : '')
  const [amendValue, setAmendValue] = React.useState(data ? data.actual : '')
  const [text] = React.useState(data)
  const [patch, setPatch] = React.useState<any>(null)

  const computeDiff = debounce(() => {
    setPatch(
      JsDiff.createPatch('', initialValue, amendValue, '', '', {
        context: 1
      })
    )
  }, 100)

  React.useEffect(() => {
    computeDiff()
  }, [amendValue])

  const restoreInitialValue = () => {
    setAmendValue(initialValue)
  }

  const hasDiffs = () => initialValue !== amendValue

  const addAmend = () => {
    // Add a newline at the amendValue end
    // by default to avoid some conflicts
    if (!amendValue.endsWith('\n')) {
      setAmendValue(initialValue + '\n')
      postAmend()
    } else {
      postAmend()
    }
  }

  const postAmend = () => {
    Socket.fetch('postAmend', {
      name: amendName,
      description: amendDescription,
      version: text.patches.length,
      textID: text._id,
      patch
    }).then((amend: any) => {
      setRedirectToAmend(true)
    })
  }

  React.useEffect(() => {
    return () => {
      Socket.off('postAmend')
    }
  }, [])

  if (redirectToAmend) {
    return <Redirect to={path.home} />
  }

  return (
    <Columns>
      <Column>
        <div className="field">
          <label htmlFor="title" className="label">
            Titre de l'amendement
            <div className="control">
              <input
                required
                name="title"
                className="input"
                type="text"
                autoFocus={true}
                value={amendName}
                onChange={event => {
                  setAmendName(event.target.value)
                }}
                placeholder="Nommez votre amendement en quelques mots"
              />
            </div>
          </label>
        </div>

        <div className="field">
          <label htmlFor="description" className="label">
            Description / Argumentaire
            <div className="control">
              <textarea
                required
                rows={4}
                name="description"
                value={amendDescription}
                onChange={event => {
                  setAmendDescription(event.target.value)
                }}
                className="textarea"
                placeholder="Défendez votre amendement en quelques phrases"
              />
            </div>
          </label>
        </div>

        <div className="field">
          <label htmlFor="editor" className="label">
            Editeur du texte
            <div className="control">
              <textarea
                rows={8}
                name="editor"
                className="textarea"
                value={amendValue}
                onChange={event => {
                  setAmendValue(event.target.value)
                }}
              />
            </div>
          </label>
        </div>

        <Button
          onClick={restoreInitialValue}
          className="is-danger is-outlined is-fullwidth"
        >
          <Icon type={'solid'} name="fa-undo" />
          <span>Restaurer le texte initial</span>
        </Button>

        {hasDiffs() ? (
          <Amend
            amend={{
              name: amendName,
              description: amendDescription,
              version: text.patches.length,
              patch
            }}
            text={text}
          />
        ) : (
          <React.Fragment>
            <br />
            <p className="has-text-centered has-text-danger">
              Aucune modification à afficher
            </p>
          </React.Fragment>
        )}

        <br />

        <Button
          onClick={addAmend}
          disabled={
            !hasDiffs() || !amendName || !amendDescription || !isConnected()
          }
          className="is-success is-fullwidth"
        >
          Proposer cet amendement
        </Button>
      </Column>
    </Columns>
  )
}
