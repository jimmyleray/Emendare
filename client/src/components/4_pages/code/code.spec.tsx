import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { CodePage } from './code'

it('should render a CodePage', () => {
  const component = shallow(<CodePage />)
  expect(component).toBeTruthy()
})
