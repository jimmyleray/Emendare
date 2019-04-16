import * as React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { I18nProvider } from '../../../components'
import { renderWithRouter } from '../../../helpers'
import { Authentification } from './authentification'

it('should render a Authentification and login form', async () => {
  const { container, getByText, getByPlaceholderText } = renderWithRouter(
    <I18nProvider>
      <Authentification />
    </I18nProvider>
  )
  expect(container).toBeTruthy()
  expect(getByText('Login')).toBeTruthy()
  expect(getByText('Register')).toBeTruthy()

  // Click on Login
  fireEvent.click(getByText('Login'))

  expect(getByPlaceholderText('Email')).toBeTruthy()
  expect(getByPlaceholderText('Mot de passe')).toBeTruthy()
})

it('should render a Authentification and register form', async () => {
  const { container, getByText, getByPlaceholderText } = renderWithRouter(
    <I18nProvider>
      <Authentification />
    </I18nProvider>
  )
  expect(container).toBeTruthy()
  expect(getByText('Login')).toBeTruthy()
  expect(getByText('Register')).toBeTruthy()

  // Click on Register
  fireEvent.click(getByText('Register'))

  expect(getByPlaceholderText('Email')).toBeTruthy()
  expect(getByPlaceholderText('Nouveau mot de passe')).toBeTruthy()
  expect(getByPlaceholderText('Verification du mot de passe')).toBeTruthy()
})

it('should render a Authentification pass to login/register and register/login', async () => {
  const { container, getByText, getByPlaceholderText } = renderWithRouter(
    <I18nProvider>
      <Authentification />
    </I18nProvider>
  )
  expect(container).toBeTruthy()
  expect(getByText('Login')).toBeTruthy()
  expect(getByText('Register')).toBeTruthy()

  fireEvent.click(getByText('Register'))
  fireEvent.click(getByText("J'ai déjà un compte"))

  expect(getByPlaceholderText('Email')).toBeTruthy()
  expect(getByPlaceholderText('Mot de passe')).toBeTruthy()

  fireEvent.click(getByText("Je n'ai pas de compte"))

  expect(getByPlaceholderText('Email')).toBeTruthy()
  expect(getByPlaceholderText('Nouveau mot de passe')).toBeTruthy()
  expect(getByPlaceholderText('Verification du mot de passe')).toBeTruthy()
})
