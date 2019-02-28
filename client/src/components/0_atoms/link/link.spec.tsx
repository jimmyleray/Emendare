import * as React from 'react'
import { render } from 'react-testing-library'

import { Link } from './link'

it('should render a Link', () => {
  const { container, getByText } = render(
    <Link to="https://www.google.com/">Lien</Link>
  )
  expect(container).toBeTruthy()
  expect(getByText('Lien')).toBeTruthy()
})
