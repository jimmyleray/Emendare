import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { UpdateEmail } from './updateEmail'

it('should render a EarlyAlert', () => {
  const component = shallow(<UpdateEmail />)
  expect(component).toBeTruthy()
})
