import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { Text } from './text'
import { textMock } from '../../../interfaces'
import { Providers } from '../../../components'

it('should render a Text', () => {
  const component = shallow(
    <Providers>
      <Text data={textMock} />
    </Providers>
  )
  expect(component).toBeTruthy()
})
