import React from 'react'
import { Button } from '../../../components'
import { IUser } from '../../../interfaces'

interface IUserProfilProps {
  user: IUser
}

interface IUserProfilState {
  email: string
  password: string
  error: any
}

export const UserProfil = (props: IUserProfilProps) => {}
