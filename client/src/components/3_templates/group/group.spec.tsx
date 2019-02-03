import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Group } from './group'

it('should render a Group', () => {
  const component = shallow(<Group />)
  expect(component).toBeTruthy()
})
