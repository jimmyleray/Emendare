import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Amend } from './amend'

it('should render an Amend', () => {
  const component = shallow(<Amend amend={null} text={null} />)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Amendement')
})
