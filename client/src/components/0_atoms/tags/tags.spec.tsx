import * as React from 'react'
import { render } from 'react-testing-library'

import { Tags } from './tags'

it('should render Tags', () => {
  const { container, getByText } = render(<Tags>Test</Tags>)
  expect(container).toBeTruthy()
  expect(getByText('Test')).toBeTruthy()
})
