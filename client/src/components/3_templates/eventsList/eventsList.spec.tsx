import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { EventsList } from './eventsList'
import { Providers } from '../../../components'

it('should render EventsList', () => {
  const component = shallow(
    <Providers>
      <EventsList events={[]} newEvents={[]} hasNextPage={false} />
    </Providers>
  )
  expect(component).toBeTruthy()
})
