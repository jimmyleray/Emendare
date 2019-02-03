import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Notification } from './notification'

it('should render a Notification', () => {
  const component = shallow(<Notification>Test</Notification>)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
