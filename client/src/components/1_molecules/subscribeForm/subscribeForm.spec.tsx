import * as React from 'react'
import { render } from 'react-testing-library'
import { Button } from '../../../components'

import { SubscribeForm } from './subscribeForm'

it('should render a subscribeForm without', () => {
  const { container, getByText } = render(
    <SubscribeForm render={() => <Button type="submit">Test</Button>} />
  )
  expect(container).toBeTruthy()
  expect(getByText('Test')).toBeTruthy()
})
