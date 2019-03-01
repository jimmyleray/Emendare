import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { PwdForm } from './pwdForm'

it('should render an AmendPage', () => {
  const component = shallow(
    <PwdForm
      change={null}
      password={'abcd'}
      checkPassword={'abcd'}
      pwdValid={false}
      pwdSame={true}
    />
  )
  expect(component).toBeTruthy()
})
