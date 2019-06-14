import {
  getNewEvent,
  deleteNewEvent,
  filterEventsByUserTextFollowed,
  isUserFollowText
} from './events'
import {
  eventMock,
  IResponse,
  IEvent,
  userMock,
  amendMock
} from '../../../../interfaces'

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
    expect(deleteNewEvent(eventMock.id, newEvents).length).toBe(0)
  })
  it('should return the same list of event', () => {
    expect(deleteNewEvent('1', [eventMock])).toContain(eventMock)
  })
})

describe('isUserFollowText', () => {
  it('should return false', () => {
    const user = { ...userMock, followedTexts: ['text2'] }
    expect(isUserFollowText(user, 'text1')).toBeFalsy()
  })

  it('should return true', () => {
    const user = { ...userMock, followedTexts: ['text1'] }
    expect(isUserFollowText(user, 'text1')).toBeTruthy()
  })
})

describe('filterEventsByUserTextFollowed', () => {
  it('should return events with no filter', () => {
    let events: Array<{ event: IEvent; target: IResponse<any> | undefined }> = [
      { event: eventMock, target: { data: undefined } },
      { event: eventMock, target: { data: 'test' } }
    ]
    expect(filterEventsByUserTextFollowed(events, null)).toEqual(events)
    events = [
      {
        event: {
          ...eventMock,
          target: { id: '5c64389cae3ae3695c711e44', type: 'text' }
        },
        target: { data: 'test' }
      }
    ]
    expect(filterEventsByUserTextFollowed(events, userMock)).toEqual(events)
    expect(filterEventsByUserTextFollowed(events, null)).toEqual(events)
  })

  it('should return events with filter', () => {
    let events: Array<{ event: IEvent; target: IResponse<any> | undefined }> = [
      {
        event: {
          ...eventMock,
          target: { id: '5c64389cae3ae3695c711e44', type: 'amend' }
        },
        target: { data: amendMock }
      },
      {
        event: {
          ...eventMock,
          target: { id: '5c64389cae3ae3695c711e44', type: 'result' }
        },
        target: { data: amendMock }
      }
    ]
    expect(filterEventsByUserTextFollowed(events, userMock)).not.toContain(
      events[0]
    )
  })
})
