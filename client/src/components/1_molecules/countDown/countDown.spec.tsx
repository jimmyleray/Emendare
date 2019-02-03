import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { CountDown } from './countDown'
import { Time } from '../../../services'

it('should render a CountDown', () => {
  const component = shallow(
    <CountDown date={Time.addTimeToDate(new Date(), 10000)} />
  )
  expect(component).toBeTruthy()
  expect(component.html()).toContain('secondes')
})
