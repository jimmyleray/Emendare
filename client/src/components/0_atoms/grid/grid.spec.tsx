import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Grid } from './grid'

it('should render a Box', () => {
  const component = shallow(<Grid>Test</Grid>)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
