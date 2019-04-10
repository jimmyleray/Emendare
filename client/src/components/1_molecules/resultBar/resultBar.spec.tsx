import * as React from 'react'
import { render } from 'react-testing-library'

import { ResultBar } from './resultBar'

it('should render a ResultBar', () => {
  const { container } = render(
    <ResultBar results={{ up: 10, down: 5, ind: 5 }} />
  )
  expect(container).toBeTruthy()
})
