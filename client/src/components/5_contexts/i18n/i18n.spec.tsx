import * as React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzyme.configure({ adapter: new Adapter() })

import { I18nContext, I18nProvider } from './i18n'

it('should render a i18nContext', () => {
  const component = shallow(
    <I18nProvider>
      <I18nContext.Consumer>{() => <p>Test</p>}</I18nContext.Consumer>
    </I18nProvider>
  )
  expect(component).toBeTruthy()
  expect(component.html()).toContain('Test')
})
