import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { NewsPage } from './news'
import { Providers } from '../../../components'

it('should render a NewsPage', () => {
  const component = shallow(
    <Providers>
      <NewsPage />
    </Providers>
  )
  expect(component).toBeTruthy()
})
