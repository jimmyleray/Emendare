import * as React from 'react'
import { render } from 'react-testing-library'

import { Media } from './media'

it('should render a Media', () => {
  const { container, getByText } = render(<Media className="test">Media</Media>)
  expect(container).toBeTruthy()
  const mediaNode: any = container.querySelector('div')
  expect(mediaNode.classList.contains('media')).toBeTruthy()
  expect(mediaNode.classList.contains('test')).toBeTruthy()
})

it('should render a Media Left', () => {
  const { container } = render(<Media.Left className="test">Media</Media.Left>)
  expect(container).toBeTruthy()
  const mediaNode: any = container.querySelector('div')
  expect(mediaNode.classList.contains('media-left')).toBeTruthy()
  expect(mediaNode.classList.contains('test')).toBeTruthy()
})

it('should render a Media Content', () => {
  const { container } = render(
    <Media.Content className="test">Media</Media.Content>
  )
  expect(container).toBeTruthy()
  const mediaNode: any = container.querySelector('div')
  expect(mediaNode.classList.contains('media-content')).toBeTruthy()
  expect(mediaNode.classList.contains('test')).toBeTruthy()
})

it('should render a Media Right', () => {
  const { container } = render(
    <Media.Right className="test">Media</Media.Right>
  )
  expect(container).toBeTruthy()
  const mediaNode: any = container.querySelector('div')
  expect(mediaNode.classList.contains('media-right')).toBeTruthy()
  expect(mediaNode.classList.contains('test')).toBeTruthy()
})
