import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import VotesPage from './votes'
import { Providers } from '../../../components'

it('should render a VotesPage', () => {
  const component = shallow(
    <Providers>
      <VotesPage />
    </Providers>
  )
  expect(component).toBeTruthy()
})
