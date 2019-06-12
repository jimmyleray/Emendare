import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { useUser, UserProvider } from './user'

it('should render a UserContext', () => {
  const Component = () => {
    const value = useUser()
    return (
      <UserProvider>
        <p>Test</p>
      </UserProvider>
    )
  }
  const component = shallow(<Component />)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
