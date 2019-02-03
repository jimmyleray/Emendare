import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { UserContext, UserProvider } from './user'

it('should render a UserContext', () => {
  const component = shallow(
    <UserProvider>
      <UserContext.Consumer>{() => <p>Test</p>}</UserContext.Consumer>
    </UserProvider>
  )
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
