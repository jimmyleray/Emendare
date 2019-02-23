import React, { useState, useEffect, useCallback } from 'react'
import { ConfirmAlert, WarningAlert, Button, Icon } from '../../../components'
import { Socket } from '../../../services'
import { useAlert } from '../../../hooks'
import { callAll } from '../../../helpers'

export const UpdateEmail = () => {
  const { showAlert, openAlert, closeAlert } = useAlert()
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    return () => {
      Socket.off('update-email')
    }
  })

  const submitEmail = () => {
    Socket.fetch('update-email', {
      email: email
    })
      .then(() => {})
      .catch((error: any) => {
        console.error(error)
        setError(error)
      })
  }

  const reset = useCallback(() => {
    setError(null)
    setEmail('')
  }, [])

  const change = useCallback((event: any) => {
    setEmail(event.target.value)
  }, [])

  return showAlert || error ? (
    error ? (
      <WarningAlert
        message={error['message']}
        className={'is-danger'}
        onClick={callAll(reset, closeAlert)}
      />
    ) : (
      <ConfirmAlert
        message={
          'Attention cette action va vous déconnecter, veuillez confimer votre nouvel email pour accéder à votre compte'
        }
        className={'is-danger'}
        onCancel={closeAlert}
        onConfirm={callAll(closeAlert, submitEmail)}
      />
    )
  ) : (
    <form
      onSubmit={(event: any) => {
        event.preventDefault()
        openAlert()
      }}
      style={{ marginBottom: '4%' }}
    >
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            placeholder="Nouvel email"
            onChange={change}
            className="input"
            type="email"
            aria-label="email input"
            value={email}
          />
          <Icon type="fas fa-envelope" className="icon is-medium is-left" />
        </p>
      </div>
      <div className="field is-grouped is-grouped-right">
        <Button type="submit" className="is-success" disabled={!email}>
          Valider
        </Button>
      </div>
    </form>
  )
}
