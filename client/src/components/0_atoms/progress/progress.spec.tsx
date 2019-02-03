import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Progress } from './progress'

it('should render a Progress', () => {
  const component = shallow(<Progress>Test</Progress>)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
