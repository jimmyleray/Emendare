import { getNewEvent, deleteNewEvent } from './helper'
import { eventMock } from '../../../../../interfaces'

/** Test Helpers */
describe('getNewEvent', () => {
  it('should return an empty array', () => {
    expect(getNewEvent(null, []).length).toBe(0)
    const events = [eventMock]
    expect(getNewEvent(eventMock.created, events).length).toBe(0)
  })
  it('should return an array of one event', () => {
    const events = [eventMock]
    expect(getNewEvent('2019-02-13T15:32:44.144Z', events)).toContain(eventMock)
  })
})

describe('deleteNewEvent', () => {
  it('should return an empty array', () => {
    expect(deleteNewEvent('1', []).length).toBe(0)
  })
  it('should delete the event from the list of new events', () => {
    const newEvents = [eventMock]
    expect(deleteNewEvent(eventMock._id, newEvents).length).toBe(0)
  })
  it('should return the same list of event', () => {
    expect(deleteNewEvent('1', [eventMock])).toContain(eventMock)
  })
})
