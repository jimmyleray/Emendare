import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { SearchContext, SearchProvider } from './search'

it('should render a SearchContext', () => {
  const component = shallow(
    <SearchProvider>
      <SearchContext.Consumer>{() => <p>Test</p>}</SearchContext.Consumer>
    </SearchProvider>
  )
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
