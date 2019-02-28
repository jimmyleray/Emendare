import * as React from 'react'
import { render } from 'react-testing-library'

import { Spacer } from './spacer'

it('should render a Spacer', () => {
  const { container } = render(<Spacer />)
  expect(container).toBeTruthy()
})
