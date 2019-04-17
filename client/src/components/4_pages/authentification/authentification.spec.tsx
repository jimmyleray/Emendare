import * as React from 'react'
import { I18nProvider } from '../..'
import { renderWithRouter } from '../../../helpers'
import { AuthentificationPage } from './authentification'

it('should render a AuthentificationPage', async () => {
  const { container } = renderWithRouter(
    <I18nProvider>
      <AuthentificationPage />
    </I18nProvider>
  )
  expect(container).toBeTruthy()
})
