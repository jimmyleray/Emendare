import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Divider } from './divider'

it('should render a Divider', () => {
  const component = shallow(<Divider content="Test" />)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
