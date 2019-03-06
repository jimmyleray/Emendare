import * as React from 'react'
import { render } from 'react-testing-library'

import { DropDown } from './dropdown'

it('should render a DropDown', () => {
  const { container, getByText } = render(
    <DropDown>
      <DropDown.Trigger title="Trigger" />
      <DropDown.Menu>
        <DropDown.Item>
          <p>Test</p>
        </DropDown.Item>
      </DropDown.Menu>
    </DropDown>
  )
  expect(container).toBeTruthy()
})
