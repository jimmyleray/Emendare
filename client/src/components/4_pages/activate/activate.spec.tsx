import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import ActivatePage from './activate'

it('should render an ActivatePage', () => {
  const component = shallow(<ActivatePage match={{ params: { id: 'test' } }} />)
  expect(component).toBeTruthy()
})
