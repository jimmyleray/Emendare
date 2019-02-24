import * as React from 'react'
import enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { TextPage } from './text'
import { Providers } from '../../../components'

it('should render a TextPage', () => {
  const component = mount(
    <Providers>
      <TextPage match={{ params: { id: 'test' } }} />
    </Providers>
  )
  expect(component).toBeTruthy()
})
