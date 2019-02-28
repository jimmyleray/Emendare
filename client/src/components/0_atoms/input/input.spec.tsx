import * as React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'

import { Input } from './input'

describe('<Input/>', () => {
  afterEach(cleanup)

  it('should render an Input without any icons', () => {
    const { container } = render(
      <Input type="email" placeholder="email" ariaLabel="email" />
    )
    expect(container).toBeTruthy()
  })
  it('It should render an Input with some icon(s)', () => {
    let icon: any
    const { container, rerender } = render(
      <Input
        type="email"
        placeholder="email"
        ariaLabel="email"
        iconLeft="fas fa-envelope"
      />
    )
    expect(container).toBeTruthy()
    icon = container.querySelector('i')
    expect(icon.classList.contains('fa-envelope', 'is-left')).toBeTruthy()
    rerender(
      <Input
        type="email"
        placeholder="email"
        ariaLabel="email"
        iconRight="fas fa-lock"
      />
    )
    icon = container.querySelector('i')
    expect(icon.classList.contains('fa-envelope')).not.toBeTruthy()
    expect(icon.classList.contains('fa-lock', 'is-right')).toBeTruthy()
    rerender(
      <Input
        type="email"
        placeholder="email"
        ariaLabel="email"
        iconRight="fas fa-lock"
        iconLeft="fas fa-envelope"
      />
    )
    icon = container.querySelector('i')
    expect(
      icon.classList.contains('fa-envelope', 'fa-lock', 'is-right', 'is-left')
    ).toBeTruthy()
  })
})
