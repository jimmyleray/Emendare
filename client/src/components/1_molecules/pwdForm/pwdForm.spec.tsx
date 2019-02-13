import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { userMock } from '../../../interfaces'

enzyme.configure({ adapter: new Adapter() })

import { PwdForm } from './pwdForm'

it('should render an AmendPage', () => {
  const component = shallow(<PwdForm user={userMock} />)
  expect(component).toBeTruthy()
})
