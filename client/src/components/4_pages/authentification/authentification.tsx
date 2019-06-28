import React from 'react'
import { Page, ProfilCard } from '../../../components'

interface IAuthentificationPageProps {
  location?: any
}

const AuthentificationPage = ({ location }: IAuthentificationPageProps) => (
  <Page title="Authentification" style={{ padding: 0 }}>
    <ProfilCard location={location} />
  </Page>
)

export default AuthentificationPage
