import * as React from 'react'
import { render } from 'react-testing-library'
import { amendMock } from '../../../../../interfaces'

import { ResultAmend } from './resultAmend'
import { I18nProvider } from '../../../components'

it('should render a ResultAmend', () => {
  const { container, getByText } = render(
    <I18nProvider>
      <ResultAmend amend={amendMock} />
    </I18nProvider>
  )
  expect(container).toBeTruthy()
  expect(getByText('0')).toBeTruthy()
})
