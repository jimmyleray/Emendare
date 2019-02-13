import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { PwdForm } from './pwdForm'

it('should render an AmendPage', () => {
  const user = {
    __v: 0,
    _id: '5c64389cae3ae3695c711e44',
    activated: true,
    activationToken: '4d55a560ea0be764c55dc01a872c8fc8205cf262994c8',
    amends: [],
    created: '2019-02-13T15:32:44.344Z',
    downVotes: [],
    email: 'test@test.com',
    followedTexts: [],
    indVotes: [],
    lastEventDate: '2019-02-13T15:32:44.344Z',
    notification: {
      amendAccepted: true,
      amendRefused: true,
      newAmend: true,
      newText: true
    },
    password: '$2b$10$Bm4YVAC',
    token: 'bfb82457793d31a7',
    upVotes: []
  }

  const component = shallow(<PwdForm user={user} />)
  expect(component).toBeTruthy()
})
