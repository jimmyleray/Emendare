import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { LegalPage } from './legal'
import { Providers } from '../../../components'

it('should render a LegalPage', () => {
  const component = shallow(
    <Providers>
      <LegalPage />
    </Providers>
  )
  expect(component).toBeTruthy()
})
