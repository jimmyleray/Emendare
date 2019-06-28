import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import ResetPage from './reset'

it('should render a ResetPage', () => {
  const component = shallow(<ResetPage />)
  expect(component).toBeTruthy()
})
