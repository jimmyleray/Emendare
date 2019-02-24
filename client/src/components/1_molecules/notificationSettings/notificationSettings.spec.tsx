import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { userMock } from '../../../../../interfaces'

enzyme.configure({ adapter: new Adapter() })

import { NotificationSettings } from './notificationSettings'

it('should render a NotificationSettings', () => {
  const component = shallow(<NotificationSettings user={userMock} />)
  expect(component).toBeTruthy()
})
