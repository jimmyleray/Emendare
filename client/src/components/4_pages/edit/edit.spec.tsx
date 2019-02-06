import * as React from 'react'
import enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { EditPage } from './edit'
import { DataContext } from '../../../components'

it('should render an EditPage', () => {
  const component = mount(
    <DataContext.Provider
      value={{ memo: {}, listeners: [], get: type => id => null }}
    >
      <EditPage match={{ params: { id: 'test' } }} />
    </DataContext.Provider>
  )
  expect(component).toBeTruthy()
})
