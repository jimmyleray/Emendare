import { socket } from './socket'

test('socket has some methods defined', () => {
  expect(socket.emit).toBeDefined()
  expect(socket.fetch).toBeDefined()
  expect(socket.off).toBeDefined()
  expect(socket.on).toBeDefined()
})
