import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { ResultsIcon } from './resultsIcon'
import { resultMock } from '../../../../../interfaces'

it('should render a ResultsIcon', () => {
  const component = shallow(<ResultsIcon data={resultMock} />)
  expect(component).toBeTruthy()
})
