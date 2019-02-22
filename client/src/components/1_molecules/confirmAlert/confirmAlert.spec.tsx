import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { ConfirmAlert } from './confirmAlert'

it('should render a EarlyAlert', () => {
  const component = shallow(
    <ConfirmAlert
      message={test}
      onCancel={() => console.log('cancel')}
      onConfirm={() => console.log('confirm')}
    />
  )
  expect(component).toBeTruthy()
})
