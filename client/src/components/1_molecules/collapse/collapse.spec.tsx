import * as React from 'react'
import { render } from 'react-testing-library'

import { Collapse } from './collapse'

it('should render a Collapse without', () => {
  const { container, getByText } = render(
    <Collapse>
      <Collapse.Trigger>{(on: boolean) => 'Trigger'}</Collapse.Trigger>
      <Collapse.Detail>Detail</Collapse.Detail>
    </Collapse>
  )
  expect(container).toBeTruthy()
  expect(getByText('Trigger')).toBeTruthy()
})
