import * as React from 'react'
import enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { TextPage } from './text'
import { DataContext } from '../../../components'

it('should render a TextPage', () => {
  const component = mount(
    <DataContext.Provider
      value={{ memo: {}, listeners: [], get: type => id => null }}
    >
      <TextPage match={{ params: { id: 'test' } }} />
    </DataContext.Provider>
  )
  expect(component).toBeTruthy()
})
