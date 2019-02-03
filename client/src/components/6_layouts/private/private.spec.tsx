import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { PrivateRoute } from './private'

it('should render a PrivateRoute', () => {
  const component = shallow(<PrivateRoute />)
  expect(component).toBeTruthy()
})
