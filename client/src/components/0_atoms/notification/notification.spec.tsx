import * as React from 'react'
import { render } from 'react-testing-library'

import { Notification } from './notification'

it('should render a Notification', () => {
  const { container, getByText } = render(<Notification>Test</Notification>)
  expect(container).toBeTruthy()
  expect(getByText('Test')).toBeTruthy()
})
