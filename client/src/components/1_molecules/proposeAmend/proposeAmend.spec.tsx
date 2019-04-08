import * as React from 'react'
import { textMock } from '../../../../../interfaces'
import { renderWithRouter } from '../../../helpers'
import { ProposeAmend } from './proposeAmend'

it('should render a ProposeAmend', () => {
  const { container, getByText } = renderWithRouter(
    <ProposeAmend text={textMock} />
  )
  expect(container).toBeTruthy()
  expect(getByText('Proposer un amendement')).toBeTruthy()
})
