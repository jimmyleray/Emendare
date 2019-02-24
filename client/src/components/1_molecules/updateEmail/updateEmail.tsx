import React, { useState, useEffect, useCallback } from 'react'
import { ConfirmAlert, WarningAlert, Button, Icon } from '../../../components'
import { IError } from '../../../../../interfaces'
import { Socket } from '../../../services'
import { useAlert } from '../../../hooks'
import { callAll } from '../../../helpers'

export const UpdateEmail = () => {
  const { showAlert, openAlert, closeAlert } = useAlert()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<IError | null>(null)

  useEffect(() => {
    return () => {
      Socket.off('update-email')
    }
  })

  const submitEmail = () => {
    Socket.fetch('update-email', { email }).catch((err: any) => {
      console.error(err)
      setError(err)
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
    error && error.message ? (
      <WarningAlert
        message={error.message}
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
      <div className="field is-grouped">
        <Button type="submit" className="is-success" disabled={!email}>
          Valider
        </Button>
      </div>
    </form>
  )
}
