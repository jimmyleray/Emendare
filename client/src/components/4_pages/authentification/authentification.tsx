import React from 'react'
import { Page, AuthentificationForm } from '../../../components'

interface IAuthentificationPageProps {
  location?: any
}

export const AuthentificationPage = ({
  location
}: IAuthentificationPageProps) => (
  <Page title="Authentification">
    <AuthentificationForm
      location={location}
      withText={true}
      withLogo={false}
    />
  </Page>
)
