import * as React from 'react'
import { render } from 'react-testing-library'

import { Tag } from './tag'

it('should render a Tag', () => {
  const { container, getByText } = render(<Tag>Test</Tag>)
  expect(container).toBeTruthy()
  expect(getByText('Test')).toBeTruthy()
})
