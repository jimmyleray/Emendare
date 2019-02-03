import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { NotificationsContext, NotificationsProvider } from './notifications'

it('should render a NotificationsContext', () => {
  const component = shallow(
    <NotificationsProvider>
      <NotificationsContext.Consumer>
        {() => <p>Test</p>}
      </NotificationsContext.Consumer>
    </NotificationsProvider>
  )
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
