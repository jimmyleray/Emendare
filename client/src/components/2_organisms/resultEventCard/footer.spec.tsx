import * as React from 'react'
import { render } from 'react-testing-library'
import { amendMock } from '../../../../../interfaces'
import { Footer } from './footer'

it('should render a Collapse without', () => {
  const { container, getByText } = render(
    <Footer amend={amendMock} isConfliced={false} />
  )
  expect(container).toBeTruthy()
  expect(getByText('1')).toBeTruthy()
  expect(getByText('2')).toBeTruthy()
  expect(getByText('3')).toBeTruthy()
})
