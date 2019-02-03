import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Button } from './button'

it('should render a Button', () => {
  const component = shallow(<Button>Test</Button>)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
