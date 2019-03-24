import React, { useEffect, useState, useCallback, useContext } from 'react'
import {
  ConfirmAlert,
  Button,
  Icon,
  Input,
  UserContext
} from '../../../components'
import { Socket } from '../../../services'
import { useAlert } from '../../../hooks'
import { IUser } from '../../../../../interfaces'
import { callAll } from '../../../helpers'

const DeleteAccountMessage = ({ type, placeholder, ...rest }: any) => (
  <React.Fragment>
    <p>
      <strong>Attention cette action est définitive et irréversible</strong>.
      Elle entrainera la suppression de toutes vos données.
    </p>
    <div className="field" style={{ marginTop: '0.4rem' }}>
      <Input
        type="email"
        placeholder="Tapez votre email pour confirmer"
        iconLeft="fa-envelope"
        ariaLabel="Tapez votre email pour confirmer"
        className="is-danger"
        {...rest}
      />
    </div>
  </React.Fragment>
)

interface IDeleteAccountProps {
  /** User data */
  user: IUser
}

export const DeleteAccount = ({ user }: IDeleteAccountProps) => {
  const [email, setEmail] = useState('')
  const { showAlert, openAlert, closeAlert } = useAlert()
  const { logout } = useContext(UserContext)

  useEffect(() => {
    return () => {
      Socket.off('deleteAccount')
    }
  })

  const change = useCallback((event: any) => {
    setEmail(event.target.value)
  }, [])

  const deleteAccount = async () => {
    await Socket.fetch('deleteAccount')
      .then(logout)
      .catch(console.error)
  }

  return (
    <React.Fragment>
      {showAlert ? (
        <ConfirmAlert
          message={<DeleteAccountMessage onChange={change} />}
          disabled={user.email !== email}
          onConfirm={callAll(deleteAccount, closeAlert)}
          onCancel={closeAlert}
          className="is-danger"
        />
      ) : (
        <Button
          onClick={openAlert}
          className="is-danger is-outlined is-fullwidth"
        >
          <Icon type={'solid'} name="fa-trash-alt" />
          <span>Supprimer mon compte</span>
        </Button>
      )}
    </React.Fragment>
  )
}
