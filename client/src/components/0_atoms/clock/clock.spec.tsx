import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Clock } from './clock'
import { delay } from 'lodash'

it('should render a Clock', async () => {
  const getTime = () => new Date()
  const HOC = Clock(getTime)
  const component: any = shallow(<HOC date={new Date()} />)
  expect(component).toBeTruthy()
  delay(() => {
    expect(component).toBeTruthy()
    expect(component.html()).toContain('0 seconde')
    component.unmount()
    expect(component).toBeFalsy()
  }, 1000)
})
