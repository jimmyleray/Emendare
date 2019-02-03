import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { LoginPage } from './login'

it('should render a LoginPage', () => {
  const component = shallow(<LoginPage />)
  expect(component).toBeTruthy()
})
