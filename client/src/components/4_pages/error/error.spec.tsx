import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import ErrorPage from './error'
import { Providers } from '../../../components'

it('should render an ErrorPage', () => {
  const component = shallow(
    <Providers>
      <ErrorPage />
    </Providers>
  )
  expect(component).toBeTruthy()
})
