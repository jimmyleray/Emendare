import { UiEffectInput } from './uiEffectInput'

describe('setColor', () => {
  test('should return a css class', () => {
    expect(UiEffectInput.setColor(true, 8)).toBe('input is-success')
    expect(UiEffectInput.setColor(false, 'abc')).toBe('input is-danger')
    expect(UiEffectInput.setColor(true, 0)).toBe('input is-success')
    expect(
      UiEffectInput.setColor(false, 8, {
        true: 'is-success',
        false: 'is-warning'
      })
    ).toBe('input is-warning')
    expect(
      UiEffectInput.setColor(true, 8, {
        true: '',
        false: 'is-danger'
      })
    ).toBe('input is-success')
  })

  test('should return an empty string', () => {
    expect(UiEffectInput.setColor(true, '')).toBe('input')
  })
})
