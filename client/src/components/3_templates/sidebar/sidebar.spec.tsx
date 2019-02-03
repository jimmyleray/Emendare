import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Sidebar } from './sidebar'

it('should render a Sidebar', () => {
  const component = shallow(<Sidebar />)
  expect(component).toBeTruthy()
})
