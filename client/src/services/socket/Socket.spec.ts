import { Socket } from './Socket'

test('Socket has some methods defined', () => {
  expect(Socket.emit).toBeDefined()
  expect(Socket.fetch).toBeDefined()
  expect(Socket.off).toBeDefined()
  expect(Socket.on).toBeDefined()
})
