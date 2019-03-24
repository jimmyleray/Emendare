import * as React from 'react'
import { render } from 'react-testing-library'

import { Icon } from './icon'

it('should render an Icon', () => {
  const { container } = render(<Icon type="solid" className="fa-user" />)
  expect(container).toBeTruthy()
  const icon: any = container.querySelector('i')
  expect(icon.classList.contains('fa-user')).toBeTruthy()
})
