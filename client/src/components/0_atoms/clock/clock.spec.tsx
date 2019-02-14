import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Time } from '../../../services'
import { Clock } from './clock'
import { delay } from 'lodash'

it('should render a Clock', done => {
  const getTime = (date: Date | string) =>
    Time.convertMsToTime(Time.getTimeLeft(date))
  const HOC = Clock(getTime)
  const component = shallow(<HOC date={Time.addTimeToDate(new Date(), 2000)} />)
  expect(component).toBeTruthy()

  expect(component.instance()).toBeTruthy()
  const stop = jest.fn(component.instance().stop.bind(component.instance()))
  component.instance().stop = stop

  delay(() => {
    expect(stop).toHaveBeenCalledTimes(1)
    component.unmount()
    expect(stop).toHaveBeenCalledTimes(2)
    done()
  }, 4000)
})
