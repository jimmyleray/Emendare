import * as React from 'react'
import { render } from 'react-testing-library'
import { Button } from '../../../components'
import { renderWithRouter } from '../../../helpers'

import { LoginForm } from './loginForm'

it('should render a loginForm without', () => {
  const { container, getByText } = renderWithRouter(
    <LoginForm render={() => <Button type="submit">Test</Button>} />
  )
  expect(container).toBeTruthy()
  expect(getByText('Test')).toBeTruthy()
})
