import React from 'react'
import { Box, PwdForm } from '../../../components'
import { IUser } from '../../../interfaces'

interface IUserCredentialsProps {
  user: IUser
}

export const UserCredentials = (props: IUserCredentialsProps) => (
  <Box>
    <p className="has-text-weight-semibold">Identifiants utilisateur</p>
    <br />
    <PwdForm user={props.user} />
  </Box>
)
