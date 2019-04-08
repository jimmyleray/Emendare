import * as React from 'react'
import { render } from 'react-testing-library'
import { amendMock } from '../../../../../interfaces'
import { ResultIcon } from './resultIcon'

it('should render a Collapse without', () => {
  const { container, getByText } = render(
    <ResultIcon
      results={{
        upVotesCount: 1,
        downVotesCount: 2,
        indVotesCount: 3,
        totalPotentialVotesCount: 6
      }}
      isConfliced={false}
    />
  )
  expect(container).toBeTruthy()
  expect(getByText('1')).toBeTruthy()
  expect(getByText('2')).toBeTruthy()
  expect(getByText('3')).toBeTruthy()
})
