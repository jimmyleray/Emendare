import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import TextsPage from './texts'
import { Providers } from '../../../components'

it('should render a TextsPage', () => {
  const component = shallow(
    <Providers>
      <TextsPage />
    </Providers>
  )
  expect(component).toBeTruthy()
})
