import * as React from 'react'
import { render } from 'react-testing-library'

import { Card } from './card'

it('should render a Card', () => {
  const { container, getByText } = render(
    <Card>
      <Card.Header>
        <Card.Header.Icon>Icon</Card.Header.Icon>
        <Card.Header.Title>Title</Card.Header.Title>
      </Card.Header>
      <Card.Content>Content</Card.Content>
      <Card.Footer>
        <Card.Footer.Item>Item</Card.Footer.Item>
      </Card.Footer>
    </Card>
  )
  expect(container).toBeTruthy()
  expect(getByText('Icon')).toBeTruthy()
  expect(getByText('Title')).toBeTruthy()
  expect(getByText('Content')).toBeTruthy()
  expect(getByText('Item')).toBeTruthy()
})
