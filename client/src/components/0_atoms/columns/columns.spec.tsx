import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Columns } from './columns'

it('should render a Columns', () => {
  const component = shallow(<Columns>Test</Columns>)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
