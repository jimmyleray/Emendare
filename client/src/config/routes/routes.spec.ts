import { withID } from './routes'

test('Socket has some methods defined', () => {
  expect(withID('/test/')('35')).toBe('/test/35')
})
