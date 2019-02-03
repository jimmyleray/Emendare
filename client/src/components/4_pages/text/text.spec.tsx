import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { TextPage } from './text'

it('should render a TextPage', () => {
  const component = shallow(<TextPage match={{ params: { id: 'test' } }} />)
  expect(component).toBeTruthy()
})
