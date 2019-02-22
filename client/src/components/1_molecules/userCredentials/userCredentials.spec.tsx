import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { userMock } from '../../../interfaces'

enzyme.configure({ adapter: new Adapter() })

import { UserCredentials } from './userCredentials'

it('should render an AmendPage', () => {
  const component = shallow(<UserCredentials />)
  expect(component).toBeTruthy()
})
