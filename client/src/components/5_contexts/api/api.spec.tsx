import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { ApiContext, ApiProvider } from './api'

it('should render an ApiContext', () => {
  const component = shallow(
    <ApiProvider>
      <ApiContext.Consumer>{() => <p>Test</p>}</ApiContext.Consumer>
    </ApiProvider>
  )
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
