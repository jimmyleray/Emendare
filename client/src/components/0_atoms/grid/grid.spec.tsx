import * as React from 'react'
import { render } from 'react-testing-library'

import { Grid } from './grid'

it('should render a Grid', () => {
  const { container, getByText } = render(<Grid>Test</Grid>)
  expect(container).toBeTruthy()
  expect(getByText('Test')).toBeTruthy()
})
