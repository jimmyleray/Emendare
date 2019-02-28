import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import { render } from 'react-testing-library'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Box } from './box'

it('should render a Box', () => {
  const { container } = render(<Box>Test</Box>)
  expect(container).toBeTruthy()
  const div: any = container.querySelector('div')
  expect(div.textContent).toBe('Test')
})
