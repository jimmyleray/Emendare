import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Results } from './results'

it('should render a Results', () => {
  const component = shallow(<Results data={null} />)
  expect(component).toBeTruthy()
})
