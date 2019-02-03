import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Router } from './router'

it('should render a Router', () => {
  const component = shallow(<Router />)
  expect(component).toBeTruthy()
})
