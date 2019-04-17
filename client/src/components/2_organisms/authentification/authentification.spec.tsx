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

  expect(getByPlaceholderText('Email')).toBeTruthy()
  expect(getByPlaceholderText('Mot de passe')).toBeTruthy()
})

it('should render a Authentification pass to login/register and register/login', async () => {
  const { container, getByText, getByPlaceholderText } = renderWithRouter(
    <I18nProvider>
      <Authentification />
    </I18nProvider>
  )
  expect(container).toBeTruthy()

  fireEvent.click(getByText("Je n'ai pas de compte"))

  expect(await getByPlaceholderText('Email')).toBeTruthy()
  expect(await getByPlaceholderText('Nouveau mot de passe')).toBeTruthy()
  expect(
    await getByPlaceholderText('Verification du mot de passe')
  ).toBeTruthy()

  fireEvent.click(getByText("J'ai déjà un compte"))

  expect(await getByPlaceholderText('Email')).toBeTruthy()
  expect(await getByPlaceholderText('Mot de passe')).toBeTruthy()
})
