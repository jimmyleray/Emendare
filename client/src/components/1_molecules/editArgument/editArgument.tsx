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
  }

  return (
    <form onSubmit={submit}>
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
          />
        </div>
      </div>
      <div className="control">
        <Button type="submit">Validez</Button>
      </div>
    </form>
  )
}
