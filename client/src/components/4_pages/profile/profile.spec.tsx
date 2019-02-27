import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { ProfilePage } from './profile'
import { Providers } from '../../../components'

it('should render a ProfilePage', () => {
  const component = shallow(
    <Providers>
      <ProfilePage />
    </Providers>
  )
  expect(component).toBeTruthy()
})
