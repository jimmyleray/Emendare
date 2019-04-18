import * as React from 'react'
import { render } from 'react-testing-library'

import { Gravatar } from './gravatar'

it('should render an Avatar', () => {
  const { container } = render(<Gravatar email="jimmy.leray@zenika.com" />)
  expect(container).toBeTruthy()
})
