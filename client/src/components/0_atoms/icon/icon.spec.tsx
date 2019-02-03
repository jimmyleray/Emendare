import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Icon } from './icon'

it('should render an Icon', () => {
  const component = shallow(<Icon type="fas fa-user" />)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('fa-user')
})
