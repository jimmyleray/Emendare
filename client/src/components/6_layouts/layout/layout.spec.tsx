import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Layout } from './layout'

it('should render a Layout', () => {
  const component = shallow(<Layout>Test</Layout>)
  expect(component).toBeTruthy()
})
