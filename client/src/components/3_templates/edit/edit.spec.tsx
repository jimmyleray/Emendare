import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Edit } from './edit'

it('should render an Edit', () => {
  const component = shallow(<Edit data={null} />)
  expect(component).toBeTruthy()
})
