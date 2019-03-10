import * as React from 'react'
import { render } from 'react-testing-library'

import { Logo } from './logo'

it('should render a Logo', () => {
  const { container } = render(<Logo />)
  expect(container).toBeTruthy()
})
