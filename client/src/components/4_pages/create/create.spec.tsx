import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { CreatePage } from './create'

it('should render a CreatePage', () => {
  const component = shallow(<CreatePage />)
  expect(component).toBeTruthy()
})
