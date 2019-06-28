import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import CodePage from './code'
import { Providers } from '../../../components'

it('should render a CodePage', () => {
  const component = shallow(
    <Providers>
      <CodePage />
    </Providers>
  )
  expect(component).toBeTruthy()
})
