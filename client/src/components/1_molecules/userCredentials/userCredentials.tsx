import React from 'react'
import {
  Box,
  UpdatePassword,
  UpdateEmail,
  DeleteAccount
} from '../../../components'

export const UserCredentials = () => (
  <Box>
    <p className="has-text-weight-semibold">Identifiants utilisateur</p>
    <br />
    <p style={{ marginBottom: '0.7rem' }}>Changement d'email</p>
    <UpdateEmail />
    <p style={{ marginBottom: '0.7rem' }}>Changement de mot de passe</p>
    <UpdatePassword />
    <hr />
    <DeleteAccount />
  </Box>
)
