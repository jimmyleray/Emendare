import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { UpdatePassword } from './updatePassword'

it('should render a EarlyAlert', () => {
  const component = shallow(<UpdatePassword />)
  expect(component).toBeTruthy()
})
