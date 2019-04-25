import {
  getColorFromResult,
  getColorTextFromResult,
  getIconFromResult,
  getTextFromResult
} from './helper'
import { amendMock } from '../../../../../interfaces'

describe('getColorFromResult', () => {
  it('should return success color', () => {
    expect(getColorFromResult({ ...amendMock, accepted: true })).toBe(
      'hsl(141, 71%, 48%)'
    )
  })
  it('should return danger color', () => {
    expect(getColorFromResult({ ...amendMock, accepted: false })).toBe(
      'hsl(348, 100%, 61%)'
    )
  })
  it('should return dark color', () => {
    expect(getColorFromResult({ ...amendMock, conflicted: true })).toBe(
      'hsl(0, 0%, 21%)'
    )
  })
})

describe('getColorTextFromResult', () => {
  it('should return success color', () => {
    expect(getColorTextFromResult({ ...amendMock, accepted: true })).toBe(
      'has-text-success'
    )
  })
  it('should return danger color', () => {
    expect(getColorTextFromResult({ ...amendMock, accepted: false })).toBe(
      'has-text-danger'
    )
  })
  it('should return dark color', () => {
    expect(getColorTextFromResult({ ...amendMock, conflicted: true })).toBe(
      'has-text-dark'
    )
  })
})

describe('getIconFromResult', () => {
  it('should return icon check', () => {
    expect(getIconFromResult({ ...amendMock, accepted: true })).toBe('fa-check')
  })
  it('should return icon times', () => {
    expect(getIconFromResult({ ...amendMock, accepted: false })).toBe(
      'fa-times'
    )
  })
  it('should return icon times', () => {
    expect(getIconFromResult({ ...amendMock, conflicted: true })).toBe(
      'fa-times'
    )
  })
})

describe('getTextFromResult', () => {
  it('should return accept text', () => {
    expect(getTextFromResult({ ...amendMock, accepted: true })).toBe(
      'accepté par les participants'
    )
  })
  it('should return decline text', () => {
    expect(getTextFromResult({ ...amendMock, accepted: false })).toBe(
      'refusé par les participants'
    )
  })
  it('should return conflicted text', () => {
    expect(getTextFromResult({ ...amendMock, conflicted: true })).toBe(
      "refusé à cause d'un conflit technique"
    )
  })
})
