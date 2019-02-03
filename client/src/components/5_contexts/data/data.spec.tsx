import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { DataContext, DataProvider } from './data'

it('should render a DataContext', () => {
  const component = shallow(
    <DataProvider>
      <DataContext.Consumer>{() => <p>Test</p>}</DataContext.Consumer>
    </DataProvider>
  )
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
