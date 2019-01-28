import { Socket } from './socket'

test('Socket has some methods defined', () => {
  expect(Socket.emit).toBeDefined()
  expect(Socket.fetch).toBeDefined()
  expect(Socket.off).toBeDefined()
  expect(Socket.on).toBeDefined()
})
