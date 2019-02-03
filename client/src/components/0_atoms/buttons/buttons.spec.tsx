import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Buttons } from './buttons'

it('should render a Button', () => {
  const component = shallow(<Buttons>Test</Buttons>)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
