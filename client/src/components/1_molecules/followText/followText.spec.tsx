import * as React from 'react'
import { render } from 'react-testing-library'
import { textMock } from '../../../../../interfaces'

import { FollowText } from './followText'

it('should render a Collapse without', () => {
  const { container, getByText } = render(<FollowText text={textMock} />)
  expect(container).toBeTruthy()
  expect(getByText('Participer à ce texte')).toBeTruthy()
})
