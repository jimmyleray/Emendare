import { reset } from '../reset'

test('templating reset email', () => {
  const pwd: string = 'abcdevrgsdsd'
  expect(typeof reset.html(pwd)).toBe('string')
})
