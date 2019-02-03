import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { ErrorPage } from './error'

it('should render an ErrorPage', () => {
  const component = shallow(<ErrorPage />)
  expect(component).toBeTruthy()
})
