import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Hero } from './hero'

it('should render a Column', () => {
  const component = shallow(<Hero title="Test" subtitle="SubTest" />)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
  expect(component.html()).toContain('SubTest')
})
