import * as React from 'react'
import { render } from 'react-testing-library'

import { Columns } from './columns'

it('should render a Columns', () => {
  const { container, getByText } = render(<Columns>Test</Columns>)
  expect(container).toBeTruthy()
  expect(getByText('Test')).toBeTruthy()
})
