import * as React from 'react'
import { render } from 'react-testing-library'

import { Divider } from './divider'

it('should render a Divider', () => {
  const { container } = render(<Divider content="Test" />)
  expect(container).toBeTruthy()
})
