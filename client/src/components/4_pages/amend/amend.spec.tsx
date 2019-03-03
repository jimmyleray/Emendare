import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { AmendPage } from './amend'
import { Providers } from '../../../components'

it('should render an AmendPage', () => {
  const component = shallow(
    <Providers>
      <AmendPage match={{ params: { id: 'test' } }} />
    </Providers>
  )
  expect(component).toBeTruthy()
})
