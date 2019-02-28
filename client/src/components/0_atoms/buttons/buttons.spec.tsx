import * as React from 'react'
import { render } from 'react-testing-library'

import { Buttons } from './buttons'

it('should render a Button', () => {
  const { container, getByText } = render(<Buttons>Test</Buttons>)
  expect(container).toBeTruthy()
  expect(getByText('Test')).toBeTruthy()
})
