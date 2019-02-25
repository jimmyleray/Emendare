import React from 'react'
import { UpdatePassword, UpdateEmail, DeleteAccount } from '../../../components'
import { IUser } from '../../../../../interfaces'

interface IUserCredentialsProps {
  user: IUser
}

export const UserCredentials = ({ user }: IUserCredentialsProps) => (
  <React.Fragment>
    <p className="has-text-weight-semibold">Identifiants utilisateur</p>
    <br />
    <p style={{ marginBottom: '0.7rem' }}>Changement d'email</p>
    <UpdateEmail />
    <p style={{ marginBottom: '0.7rem' }}>Changement de mot de passe</p>
    <UpdatePassword />
    <hr />
    <DeleteAccount user={user} />
  </React.Fragment>
)
