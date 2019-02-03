import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Logo } from './logo'

it('should render a Logo', () => {
  const component = shallow(<Logo />)
  expect(component).toBeTruthy()
})
