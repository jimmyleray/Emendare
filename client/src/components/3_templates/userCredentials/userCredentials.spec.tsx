import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { userMock } from '../../../../../interfaces'

enzyme.configure({ adapter: new Adapter() })

import { UserCredentials } from './userCredentials'

it('should render an UserCredentials', () => {
  const component = shallow(<UserCredentials user={userMock} />)
  expect(component).toBeTruthy()
})
