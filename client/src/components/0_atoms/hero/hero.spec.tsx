import * as React from 'react'
import { render } from 'react-testing-library'

import { Hero } from './hero'

it('should render a Hero', () => {
  const { container, getByText } = render(
    <Hero title="Test" subtitle="SubTest" />
  )
  expect(container).toBeTruthy()
  expect(getByText('Test')).toBeTruthy()
  expect(getByText('SubTest')).toBeTruthy()
})
