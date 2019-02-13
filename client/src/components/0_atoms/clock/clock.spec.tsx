import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Clock } from './clock'

it('should render a Clock', () => {
  const now = new Date()
  const getTime = () => now
  const HOC = Clock(getTime)
  const component = shallow(<HOC date={new Date()} />)
  expect(component).toBeTruthy()

  expect(component.instance()).toBeTruthy()
  const stop = jest.fn()
  component.instance().stop = stop
  component.unmount()
  expect(stop).toHaveBeenCalled()
  expect(component.instance()).toBeFalsy()
})
