import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { AmendPage } from './amend'

it('should render an AmendPage', () => {
  const component = shallow(<AmendPage match={{ params: { id: 'test' } }} />)
  expect(component).toBeTruthy()
})
