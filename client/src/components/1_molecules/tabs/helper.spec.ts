import { getIndexDefaultTab } from './helper'

describe('getIndexDefaultTab', () => {
  test('should return 0', () => {
    expect(getIndexDefaultTab(['tab1', 'tab2'])()).toBe(0)
    expect(getIndexDefaultTab(['tab1', 'tab2'])('tab3')).toBe(0)
    expect(getIndexDefaultTab(['tab1', 'tab2'])('tab1')).toBe(0)
  })
  test('should return 1', () => {
    expect(getIndexDefaultTab(['tab1', 'tab2'])('tab2')).toBe(1)
  })
})
