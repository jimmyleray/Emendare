import { hasSelectedValueInOptions } from './helper'

describe('hasSelectedValueInOptions', () => {
  it('should return false', () => {
    const options = [{ label: 'test', value: 'test' }]
    const selectedValue = 'TEst'
    expect(hasSelectedValueInOptions(options, selectedValue)).toBeFalsy()
  })
  it('should return true', () => {
    const options = [{ label: 'test', value: 'test' }]
    const selectedValue = 'test'
    expect(hasSelectedValueInOptions(options, selectedValue)).toBeTruthy()
  })
})
