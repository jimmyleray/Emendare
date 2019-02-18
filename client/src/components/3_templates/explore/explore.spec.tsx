import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Explore } from './explore'
import { Providers } from '../../../components'

it('should render an Explore', () => {
  const component = shallow(
    <Providers>
      <Explore />
    </Providers>
  )
  expect(component).toBeTruthy()
})
