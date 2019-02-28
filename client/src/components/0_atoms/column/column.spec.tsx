import * as React from 'react'
import { render } from 'react-testing-library'

import { Column } from './column'

it('should render a Column', () => {
  const { container, getByText } = render(<Column>Test</Column>)
  expect(container).toBeTruthy()
  expect(getByText('Test')).toBeTruthy()
})
