import React from 'react'
import { Router } from 'react-router-dom'
import { render } from 'react-testing-library'
import { createMemoryHistory } from 'history'

export const renderWithRouter = (
  ui: React.ReactNode,
  { route = '/', ...renderOptions } = {}
) => {
  const history = createMemoryHistory({ initialEntries: [route] })
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions)
  return {
    ...utils
  }
}
