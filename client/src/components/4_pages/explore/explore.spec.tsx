import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { ExplorePage } from './explore'
import { Providers } from '../../../components'

it('should render a ExplorePage', () => {
  const component = shallow(
    <Providers>
      <ExplorePage />
    </Providers>
  )
  expect(component).toBeTruthy()
})
