import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Clock } from './clock'
import { delay } from 'lodash'

it('should render a Clock', done => {
  const now = new Date()
  const getTime = () => now
  const HOC = Clock(getTime)
  const component = shallow(<HOC date={new Date()} />)
  expect(component).toBeTruthy()

  delay(() => {
    expect(component.instance()).toBeTruthy()
    component.unmount()
    expect(component.instance()).toBeFalsy()
    done()
  }, 2000)
})
