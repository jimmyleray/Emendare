import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Header } from './header'

it('should render a Header', () => {
  const component = shallow(<Header />)
  expect(component).toBeTruthy()
})
