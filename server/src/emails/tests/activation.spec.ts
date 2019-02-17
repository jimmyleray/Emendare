import { activation } from '../activation'

test('templating actition email', () => {
  const pwd = 'abcdevrgsdsd'
  expect(typeof activation.html(pwd)).toBe('string')
})
