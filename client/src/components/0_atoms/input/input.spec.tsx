import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Input } from './input'

it('should render an Icon', () => {
  const component = shallow(
    <Input type="email" placeholder="email" ariaLabel="email" />
  )
  expect(component).toBeTruthy()
})
