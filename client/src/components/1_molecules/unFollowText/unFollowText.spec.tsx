import * as React from 'react'
import { render } from 'react-testing-library'
import { textMock } from '../../../../../interfaces'

import { UnFollowText } from './unFollowText'

it('should render a Collapse without', () => {
  const { container, getByText } = render(<UnFollowText text={textMock} />)
  expect(container).toBeTruthy()
  expect(getByText('Ne plus participer au texte')).toBeTruthy()
})
