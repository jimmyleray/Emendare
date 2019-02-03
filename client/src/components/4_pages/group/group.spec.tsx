import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { GroupPage } from './group'

it('should render a GroupPage', () => {
  const component = shallow(<GroupPage match={{ params: { id: 'test' } }} />)
  expect(component).toBeTruthy()
})
