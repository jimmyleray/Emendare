import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Tag } from './tag'

it('should render a Tag', () => {
  const component = shallow(<Tag>Test</Tag>)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
