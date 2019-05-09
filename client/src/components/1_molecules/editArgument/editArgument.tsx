import React from 'react'
// Components
import { Buttons, Button, Icon } from '../../../components'
// Services
import { Socket } from '../../../services'

interface IEditArgumentProps {
  /** Amend ID */
  amendID: string
}

export const EditArgument = ({ amendID }: IEditArgumentProps) => {
  const [firstStep, setFirstStep] = React.useState(false)
  const [type, setType] = React.useState('up')
  const [text, setText] = React.useState('')

  const changeType = (type: string) => {
    setType(type)
    setFirstStep(true)
  }

  const changeText = (event: any) => {
    setText(event.target.value)
  }

  const submit = (event: any) => {
    event.preventDefault()
    Socket.emit('postArgument', { type, text, amendID })
    setFirstStep(false)
    setText('')
  }

  return (
    <form onSubmit={submit} style={{ width: '100%' }}>
      {!firstStep && (
        <div className="field">
          <div className="control">
            <p
              className="is-italic has-text-centered"
              style={{ marginBottom: '0.5rem' }}
            >
              Ecrire un argument:
            </p>
            <Buttons className="is-centered ">
              <Button
                className="is-info is-medium"
                onClick={() => changeType('up')}
                style={{ flex: 1 }}
              >
                Pour
              </Button>
              <Button
                className="is-danger is-medium"
                onClick={() => changeType('down')}
                style={{ flex: 1 }}
              >
                Contre
              </Button>
            </Buttons>
          </div>
        </div>
      )}
      {firstStep && (
        <React.Fragment>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea is-fullwidth"
                onChange={changeText}
                placeholder="Votre argument ici"
                value={text}
                rows={2}
              />
            </div>
          </div>
          <div className="control">
            <Buttons>
              <Button
                disabled={text === ''}
                className="is-primary"
                type="submit"
                style={{ flex: 1 }}
              >
                Validez
              </Button>
              <Button onClick={() => setFirstStep(false)}>Annuler</Button>
            </Buttons>
          </div>
        </React.Fragment>
      )}
    </form>
  )
}
