import { reset } from './reset'

describe('Reset Email template', () => {
  test('should have the right proprety', () => {
    expect(reset).toHaveProperty('subject')
    expect(reset).toHaveProperty('html')
  })
  test('should have subject property type of string', () => {
    expect(typeof reset.subject).toBe('string')
  })
  test('should render html string', () => {
    const newPwd = '12345566'
    expect(typeof reset.html(newPwd)).toBe('string')
  })
})
