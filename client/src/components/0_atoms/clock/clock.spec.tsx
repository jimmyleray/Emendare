import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Clock } from './clock'

it('should render a Clock', () => {
  const getTime = () => new Date()
  const HOC = Clock(getTime)
  const component: any = shallow(<HOC date={new Date()} />)
  expect(component).toBeTruthy()
})
