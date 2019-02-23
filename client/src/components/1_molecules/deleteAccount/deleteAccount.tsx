import React, { useEffect } from 'react'
import { ConfirmAlert, Button, Columns, Column } from '../../../components'
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
    Socket.fetch('deleteAccount')
      .then(() => {})
      .catch((error: any) => {
        console.error(error)
      })
  }

  return showAlert ? (
    <ConfirmAlert
      message="Attention cette action est irréversible et cela entrainera la suppression de toutes vos données: texts suivis, votes en cours, données utilisateur"
      onConfirm={callAll(deleteAccount, closeAlert)}
      onCancel={closeAlert}
      className="is-danger"
    />
  ) : (
    <Columns>
      <Column>
        <p className="title is-6">Suppression de compte</p>
        <p className="subtitle is-7">
          Attention toutes vos données seront supprimées !
        </p>
      </Column>
      <Column className="is-one-fifth">
        <Button onClick={() => openAlert()}>
          <span className="icon has-text-danger">
            <i className="fas fa-trash-alt" />
          </span>
        </Button>
      </Column>
    </Columns>
  )
}
