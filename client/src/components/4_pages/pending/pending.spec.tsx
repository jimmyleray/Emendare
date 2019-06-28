import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import PendingPage from './pending'

it('should render a PendingPage', () => {
  const component = shallow(<PendingPage />)
  expect(component).toBeTruthy()
})
