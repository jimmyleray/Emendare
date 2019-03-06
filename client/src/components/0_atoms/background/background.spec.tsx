import * as React from 'react'
import { render } from 'react-testing-library'

import { Background } from './background'

it('should render a Box', () => {
  const { container } = render(
    <Background className="has-background-dark">Test</Background>
  )
  expect(container).toBeTruthy()
  const div: any = container.querySelector('div')
  expect(div.textContent).toBe('Test')
})
