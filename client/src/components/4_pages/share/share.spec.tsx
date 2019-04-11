import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { SharePage } from './share'
import { Providers } from '../../../components'

it('should render a SharePage', () => {
  const component = shallow(
    <Providers>
      <SharePage />
    </Providers>
  )
  expect(component).toBeTruthy()
})
