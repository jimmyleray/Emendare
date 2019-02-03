import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Link } from './link'

it('should render a Link', () => {
  const component = shallow(<Link to="https://www.google.com/">Lien</Link>)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('https://www.google.com/')
  expect(component.html()).toContain('Lien')
})
