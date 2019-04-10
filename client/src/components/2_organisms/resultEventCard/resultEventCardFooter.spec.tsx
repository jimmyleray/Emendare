import * as React from 'react'
import { amendMock } from '../../../../../interfaces'
import { ResultEventCardFooter } from './resultEventCardFooter'
import { renderWithRouter } from '../../../helpers'

it('should render a Collapse without', () => {
  const { container, getByText } = renderWithRouter(
    <ResultEventCardFooter amend={amendMock} />
  )
  expect(container).toBeTruthy()
  expect(getByText('0')).toBeTruthy()
})
