import { activation } from '../activation'

describe('Activation Email template', () => {
  test('should have the right proprety', () => {
    expect(activation).toHaveProperty('subject')
    expect(activation).toHaveProperty('html')
  })
  test('should have subject property type of string', () => {
    expect(typeof activation.subject).toBe('string')
  })
  test('should render html string', () => {
    const token = '12345566'
    expect(typeof activation.html(token)).toBe('string')
  })
})
