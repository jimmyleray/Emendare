import React, { useEffect } from 'react'
import { ConfirmAlert, Button, Icon } from '../../../components'
import { Socket } from '../../../services'
import { useAlert } from '../../../hooks'
import { callAll } from '../../../helpers'

export const DeleteAccount = () => {
  const { showAlert, openAlert, closeAlert } = useAlert()

  useEffect(() => {
    return () => {
      Socket.off('deleteAccount')
    }
  })

  const deleteAccount = () => {
    Socket.fetch('deleteAccount').catch(console.error)
  }

  return (
    <React.Fragment>
      {showAlert ? (
        <ConfirmAlert
          message="Attention cette action est définitive et irréversible. Elle entrainera la suppression de toutes vos données."
          onConfirm={callAll(deleteAccount, closeAlert)}
          onCancel={closeAlert}
          className="is-danger"
        />
      ) : (
        <Button
          onClick={openAlert}
          className="is-danger is-outlined is-fullwidth"
        >
          <Icon type="fas fa-trash-alt" />
          <span>Supprimer mon compte</span>
        </Button>
      )}
    </React.Fragment>
  )
}
