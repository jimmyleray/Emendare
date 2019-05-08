import React from 'react'
// Components
import { Select, Button } from '../../../components'
// Services
import { Socket } from '../../../services'

interface IEditArgumentProps {
  /** Amend ID */
  amendID: string
}

export const EditArgument = ({ amendID }: IEditArgumentProps) => {
  const [isFocus, setIsFocus] = React.useState(false)
  const [type, setType] = React.useState('up')
  const [text, setText] = React.useState('')

  const changeType = (event: any) => {
    setType(event.target.value)
  }

  const changeText = (event: any) => {
    setText(event.target.value)
  }

  const submit = (event: any) => {
    event.preventDefault()
    Socket.emit('postArgument', { type, text, amendID })
    setIsFocus(false)
  }

  return (
    <form onSubmit={submit} style={{ width: '100%' }}>
      <div className="field">
        <label>Opinion</label>
        <div className="control">
          <Select
            onChange={changeType}
            options={[
              { label: 'Pour', value: 'up' },
              { label: 'Contre', value: 'down' }
            ]}
            selectedValue={type}
            className=""
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <textarea
            className="textarea is-fullwidth"
            onChange={changeText}
            placeholder="Votre argument ici"
            value={text}
            rows={!isFocus ? 1 : 3}
            onFocus={() => setIsFocus(true)}
          />
        </div>
      </div>
      <div className="control is-right">
        <Button
          disabled={text === ''}
          className="is-right is-primary"
          type="submit"
        >
          Validez
        </Button>
      </div>
    </form>
  )
}
