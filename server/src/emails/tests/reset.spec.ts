import { reset } from '../reset'

test('templating reset email', () => {
  const pwd = 'abcdevrgsdsd'
  expect(typeof reset(pwd)).toBe('string')
})
