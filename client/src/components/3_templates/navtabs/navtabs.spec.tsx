import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Navtabs } from './navtabs'
import { Providers } from '../../../components'

it('should render a Navtabs', () => {
  const component = shallow(
    <Providers>
      <Navtabs />
    </Providers>
  )
  expect(component).toBeTruthy()
})
