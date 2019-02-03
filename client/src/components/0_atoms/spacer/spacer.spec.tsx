import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Spacer } from './spacer'

it('should render a Spacer', () => {
  const component = shallow(<Spacer />)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('flex')
})
