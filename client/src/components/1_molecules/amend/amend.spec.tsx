import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { amendMock, textMock } from '../../../../../interfaces'

enzyme.configure({ adapter: new Adapter() })

import { Amend } from './amend'

it('should render an Amend', () => {
  const component = shallow(<Amend amend={amendMock} text={textMock} />)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Amendement')
})
