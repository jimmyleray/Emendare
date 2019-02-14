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
  const now = new Date()
  const component = shallow(<HOC date={now} />)
  expect(component).toBeTruthy()

  expect(component.instance()).toBeTruthy()
  const stop = jest.fn()
  component.instance().stop = stop

  delay(() => {
    expect(stop).toHaveBeenCalled()
    done()
  }, 2000)
})
