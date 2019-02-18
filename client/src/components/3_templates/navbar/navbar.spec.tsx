import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Navbar } from './navbar'
import { Providers } from '../../../components'

it('should render a Navbar', () => {
  const component = shallow(
    <Providers>
      <Navbar />
    </Providers>
  )
  expect(component).toBeTruthy()
})
