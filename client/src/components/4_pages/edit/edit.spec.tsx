import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { EditPage } from './edit'

it('should render an EditPage', () => {
  const component = shallow(<EditPage match={{ params: { id: 'test' } }} />)
  expect(component).toBeTruthy()
})
