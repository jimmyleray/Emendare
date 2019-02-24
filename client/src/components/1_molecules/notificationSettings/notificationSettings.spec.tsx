import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { NotificationSettings } from './notificationSettings'
import { Providers } from '../../../components'

it('should render a NotificationSettings', () => {
  const component = shallow(
    <Providers>
      <NotificationSettings />
    </Providers>
  )
  expect(component).toBeTruthy()
})
