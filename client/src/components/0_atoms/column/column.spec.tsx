import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Column } from './column'

it('should render a Column', () => {
  const component = shallow(<Column>Test</Column>)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
