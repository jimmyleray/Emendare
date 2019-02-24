// librairies
import mockingoose from 'mockingoose'
// Models and interfaces
import { Event } from './Event'
import { eventMock } from '../../../../interfaces'

describe('getEvents', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  test('should return a list of events', async () => {
    mockingoose.Event.toReturn(eventMock, 'find')
    expect(typeof (await Event.getEvents())).toBe('object')
  })
})
