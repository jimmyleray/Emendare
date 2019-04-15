import * as React from 'react'
import { render } from 'react-testing-library'

import { Media } from './media'

it('should render a Media', () => {
  const { container, getByText } = render(
    <Media>
      Media
      <Media.Left>Left</Media.Left>
      <Media.Content>Content</Media.Content>
      <Media.Right>Right</Media.Right>
    </Media>
  )
  expect(container).toBeTruthy()
  expect(getByText('Media')).toBeTruthy()
  expect(getByText('Left')).toBeTruthy()
  expect(getByText('Right')).toBeTruthy()
  expect(getByText('Content')).toBeTruthy()
})
