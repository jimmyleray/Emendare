import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { ResultsPage } from './results'
import { Providers } from '../../../components'

it('should render a ResultsPage', () => {
  const component = shallow(
    <Providers>
      <ResultsPage />
    </Providers>
  )
  expect(component).toBeTruthy()
})
