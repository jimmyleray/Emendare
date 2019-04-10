import * as React from 'react'
import { render } from 'react-testing-library'
import { amendMock } from '../../../../../interfaces'
import { ResultEventCardFooter } from './resultEventCardFooter'

it('should render a Collapse without', () => {
  const { container, getByText } = render(
    <ResultEventCardFooter amend={amendMock} />
  )
  expect(container).toBeTruthy()
  expect(getByText('1')).toBeTruthy()
  expect(getByText('2')).toBeTruthy()
  expect(getByText('3')).toBeTruthy()
})
