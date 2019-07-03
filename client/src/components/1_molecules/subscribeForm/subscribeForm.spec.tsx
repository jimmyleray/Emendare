import * as React from 'react'
import { render } from 'react-testing-library'
import { Button } from '../../../components'

import { SubscribeForm } from './subscribeForm'

it('should render a subscribeForm without', () => {
  const { container, getByText } = render(
    <SubscribeForm
      email={'test@test.com'}
      password="test"
      checkPassword="test"
      pwdValid={false}
      pwdSame={true}
      error={null}
      send={false}
      submit={() => console.log('submit')}
      change={() => console.log('change')}
      render={() => <Button type="submit">Test</Button>}
    />
  )
  expect(container).toBeTruthy()
  expect(getByText('Test')).toBeTruthy()
})
