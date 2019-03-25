import * as React from 'react'
import { render } from 'react-testing-library'

import { Tabs } from './tabs'

describe('Tabs.Menu', () => {
  test('should render tabs bar with Test item', () => {
    const { getByText } = render(
      <Tabs tabsName={['tabs']}>
        <Tabs.Menu>
          <Tabs.Tab to="tabs">Test</Tabs.Tab>
        </Tabs.Menu>
      </Tabs>
    )
    expect(getByText('Test')).toBeTruthy()
  })

  test('should render tabs bar with Test item', () => {
    const { getByText } = render(
      <Tabs tabsName={['tabs']}>
        <Tabs.Menu>
          <Tabs.Tab to="tabs">Test</Tabs.Tab>
        </Tabs.Menu>
        <Tabs.Content for="tabs">TestContent</Tabs.Content>
      </Tabs>
    )
    expect(getByText('TestContent')).toBeTruthy()
  })
})
