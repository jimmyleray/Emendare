import React, { ChangeEvent } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Amend,
  Box,
  Button,
  Buttons,
  Column,
  Columns,
  Icon,
  Spacer,
  UserContext
} from '..'
import { Socket } from '../../services'
import { path } from '../../config'
import { debounce } from 'lodash'
import * as JsDiff from 'diff'

interface IEditProps {
  data: any
}

interface IEditState {
  amendName: string
  amendDescription: string
  redirectToAmend: boolean
  redirectID: string | null
  initialValue: string
  amendValue: string
  text: any
  patch: string | null
}

export class Edit extends React.Component<IEditProps, IEditState> {
  private onChange: any
  private restoreInitialValue: any
  private hasDiffs: any
  private addAmend: any

  private computeDiff = debounce(() => {
    const patch = JsDiff.createPatch(
      '',
      this.state.initialValue,
      this.state.amendValue,
      '',
      ''
    )
    this.setState({ patch })
  }, 250)

  constructor(props: IEditProps) {
    super(props)

    this.onChange = (name: string) => (event: any) => {
      this.setState({ [name]: event.target.value } as any, () => {
        this.computeDiff()
      })
    }

    this.restoreInitialValue = () => {
      this.setState({ amendValue: this.state.initialValue }, () => {
        this.computeDiff()
      })
    }

    this.hasDiffs = () => this.state.initialValue !== this.state.amendValue

    this.addAmend = () => {
      Socket.fetch('postAmend', {
        name: this.state.amendName,
        description: this.state.amendDescription,
        version: this.state.text.patches.length,
        patch: this.state.patch,
        textID: this.state.text._id
      }).then((amend: any) => {
        this.setState({ redirectID: amend._id, redirectToAmend: true })
      })
    }

    this.state = {
      amendName: '',
      amendDescription: '',
      redirectToAmend: false,
      redirectID: null,
      initialValue: this.props.data.actual,
      amendValue: this.props.data.actual,
      text: this.props.data,
      patch: null
    }
  }

  public componentDidMount() {
    this.computeDiff()
  }

  public render() {
    if (this.state.redirectToAmend) {
      return <Redirect to={path.amend(this.state.redirectID)} />
    }

    return (
      <UserContext.Consumer>
        {({ isConnected }) => (
          <>
            <div className="field has-text-centered">
              <h1 className="is-size-3">Proposition d'amendement</h1>
              <h2 className="is-size-5">
                {this.props.data.rules
                  ? this.props.data.group.name
                  : this.props.data.name}
              </h2>
            </div>
            <br />

            <Buttons>
              {this.props.data.group && (
                <Button to={path.text(this.props.data._id)}>
                  <Icon type="fas fa-chevron-left" />
                  <span>Retour au texte</span>
                </Button>
              )}

              <Spacer />
            </Buttons>

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
                        value={this.state.amendName}
                        onChange={this.onChange('amendName')}
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
                        value={this.state.amendDescription}
                        onChange={this.onChange('amendDescription')}
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
                        rows={12}
                        name="editor"
                        className="textarea"
                        value={this.state.amendValue}
                        onChange={this.onChange('amendValue')}
                      />
                    </div>
                  </label>
                </div>

                <button
                  onClick={this.restoreInitialValue}
                  className="button is-danger is-outlined"
                >
                  <Icon type="fas fa-undo" />
                  <span>Restaurer le texte initial</span>
                </button>
              </Column>

              <Column>
                <p className="has-text-centered is-size-4">
                  Pré-visualisation de votre amendement
                </p>
                <br />

                {this.hasDiffs() ? (
                  <Amend
                    amend={{
                      name: this.state.amendName,
                      description: this.state.amendDescription,
                      patch: this.state.patch,
                      version: this.state.text.patches.length
                    }}
                    text={this.state.text}
                  />
                ) : (
                  <Box>
                    <p className="has-text-centered has-text-danger">
                      Aucune modification à afficher
                    </p>
                  </Box>
                )}

                <Button
                  onClick={this.addAmend}
                  disabled={
                    !this.hasDiffs() ||
                    !this.state.amendName ||
                    !this.state.amendDescription ||
                    !isConnected()
                  }
                  className="is-success is-fullwidth"
                >
                  Proposer cet amendement
                </Button>
              </Column>
            </Columns>
          </>
        )}
      </UserContext.Consumer>
    )
  }
}
