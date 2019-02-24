import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { eventMock } from '../../../../../interfaces'

enzyme.configure({ adapter: new Adapter() })

import { Event } from './event'

it('should render a Event', () => {
  const component = shallow(<Event data={eventMock} />)
  expect(component).toBeTruthy()
})
