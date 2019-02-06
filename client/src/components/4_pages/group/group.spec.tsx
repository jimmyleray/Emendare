import * as React from 'react'
import enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { GroupPage } from './group'
import { DataContext } from '../../../components'

it('should render a GroupPage', () => {
  const component = mount(
    <DataContext.Provider
      value={{ memo: {}, listeners: [], get: type => id => null }}
    >
      <GroupPage match={{ params: { id: 'test' } }} />
    </DataContext.Provider>
  )
  expect(component).toBeTruthy()
})
