import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Page } from './page'

it('should render a Page', () => {
  const component = shallow(<Page title="test">Test</Page>)
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
