import * as React from 'react'
import { render } from 'react-testing-library'

import { CardLayout } from './card'

it('should render a Box', () => {
  const { container, getByText } = render(
    <CardLayout>
      Layout
      <CardLayout.Icon>Icon</CardLayout.Icon>
      <CardLayout.Description>Description</CardLayout.Description>
      <CardLayout.Detail>Detail</CardLayout.Detail>
      <CardLayout.Footer>Footer</CardLayout.Footer>
    </CardLayout>
  )
  expect(container).toBeTruthy()
  expect(getByText('Layout')).toBeTruthy()
  expect(getByText('Icon')).toBeTruthy()
  expect(getByText('Description')).toBeTruthy()
  expect(getByText('Footer')).toBeTruthy()
})
