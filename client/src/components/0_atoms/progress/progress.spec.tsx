import * as React from 'react'
import { render } from 'react-testing-library'

import { Progress } from './progress'

it('should render a Progress', () => {
  const { container, getByText } = render(<Progress>Test</Progress>)
  expect(container).toBeTruthy()
  expect(getByText('Test')).toBeTruthy()
})
