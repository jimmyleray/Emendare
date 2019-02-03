import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Footer } from './footer'

it('should render a Footer', () => {
  const component = shallow(<Footer />)
  expect(component).toBeTruthy()
})
