import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { NotificationSettings } from './notificationSettings'

it('should render a NotificationSettings', () => {
  const component = shallow(<NotificationSettings user={null} />)
  expect(component).toBeTruthy()
})
