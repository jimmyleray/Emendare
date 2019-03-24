import * as React from 'react'
import { render } from 'react-testing-library'

import { Avatar } from './avatar'

it('should render an Avatar', () => {
  const { container } = render(
    <Avatar
      link="https://www.github.com/"
      imgUrl="http://test_img_url/"
      name="test_name"
    />
  )
  expect(container).toBeTruthy()

  const link: any = container.querySelector('a')
  expect(link.href).toBe('https://www.github.com/')

  const img: any = container.querySelector('img')
  expect(img.src).toBe('http://test_img_url/')

  const name: any = container.querySelector('#name')
  expect(name.textContent).toBe('test_name')
})
