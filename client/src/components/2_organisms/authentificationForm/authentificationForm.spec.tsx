import * as React from 'react'
import { I18nProvider } from '../..'
import { renderWithRouter } from '../../../helpers'
import { AuthentificationForm } from './authentificationForm'

it('should render a AuthentificationForm and login form', () => {
  const { container, getByPlaceholderText } = renderWithRouter(
    <I18nProvider>
      <AuthentificationForm />
    </I18nProvider>
  )
  expect(container).toBeTruthy()

  expect(getByPlaceholderText('Email')).toBeTruthy()
  expect(getByPlaceholderText('Mot de passe')).toBeTruthy()
})
