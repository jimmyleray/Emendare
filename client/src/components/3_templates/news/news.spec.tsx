import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { News } from './news'
import { Providers } from '../../../components'

it('should render News', () => {
  const component = shallow(
    <Providers>
      <News />
    </Providers>
  )
  expect(component).toBeTruthy()
})
