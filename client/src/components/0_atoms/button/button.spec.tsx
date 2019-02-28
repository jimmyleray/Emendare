import * as React from 'react'
import { render } from 'react-testing-library'

import { Button } from './button'

describe('<Button/>', () => {
  it('should render a Button', () => {
    const { container, getByText } = render(<Button>Test</Button>)
    expect(container).toBeTruthy()
    expect(getByText('Test')).toBeTruthy()
  })
})
