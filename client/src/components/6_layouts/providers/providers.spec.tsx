import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Providers } from './providers'

it('should render a Providers', () => {
  const component = shallow(<Providers>Test</Providers>)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
