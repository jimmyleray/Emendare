import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { LegalPage } from './legal'

it('should render a LegalPage', () => {
  const component = shallow(<LegalPage />)
  expect(component).toBeTruthy()
})
