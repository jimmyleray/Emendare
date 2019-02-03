import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { SubscribePage } from './subscribe'

it('should render a SubscribePage', () => {
  const component = shallow(<SubscribePage />)
  expect(component).toBeTruthy()
})
