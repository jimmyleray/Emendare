// librairies
import mockingoose from 'mockingoose'
// Models and librairies
import { Amend } from './Amend'
import {
  textMock,
  userMock,
  eventMock,
  amendMock
} from '../../../../interfaces'

describe('getAmend', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })
  test("Amend doesn't exist", async () => {
    mockingoose.Amend.toReturn(null, 'findOne')
    expect(await Amend.getAmend('wrongId')).toMatchObject({
      error: {
        code: 404,
        message: "Oups, cet amendement n'existe pas ou plus"
      }
    })
  })

  test('should return amend data', async () => {
    mockingoose.Amend.toReturn(amendMock, 'findOne')
    expect(await Amend.getAmend('5c64389cae3ae3695c711e44')).toHaveProperty(
      'data'
    )
  })
})

describe('downVoteAmend', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })
  test('User is not connected', async () => {
    mockingoose.User.toReturn(null, 'findOne')
    expect(
      await Amend.downVoteAmend('5c64389cae3ae3695c711e44', 'wrongToken')
    ).toMatchObject({
      error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
    })
  })

  test("User doesn't participate to the text", async () => {
    mockingoose.Amend.toReturn(amendMock, 'findOne')
    mockingoose.User.toReturn({ ...userMock, followedTexts: [] }, 'findOne')
    expect(
      await Amend.downVoteAmend('5c64389cae3ae3695c711e44', '29UH90D0H39')
    ).toMatchObject({
      error: {
        code: 405,
        message: 'Cet utilisateur ne participe pas au texte'
      }
    })
  })

  test('Amend is closed', async () => {
    mockingoose.User.toReturn(
      { ...userMock, followedTexts: ['5c64389cae3ae3695c711e44'] },
      'findOne'
    )
    mockingoose.Amend.toReturn({ ...amendMock, closed: true }, 'findOne')
    expect(
      await Amend.downVoteAmend('5c64389cae3ae3695c711e44', '29UH90D0H39')
    ).toMatchObject({
      error: { code: 405, message: 'Ce scrutin est terminé' }
    })
  })

  test('User already vote against', async () => {
    mockingoose.User.toReturn(
      {
        ...userMock,
        downVotes: ['5c64389cae3ae3695c711e44'],
        followedTexts: ['5c64389cae3ae3695c711e44']
      },
      'findOne'
    )
    mockingoose.Amend.toReturn({ ...amendMock, closed: false }, 'findOne')
    expect(
      await Amend.downVoteAmend('5c64389cae3ae3695c711e44', '29UH90D0H39')
    ).toMatchObject({
      error: { code: 405, message: 'Vous avez déjà voté contre' }
    })
  })

  test('Return amend data', async () => {
    mockingoose.User.toReturn(
      {
        ...userMock,
        followedTexts: ['5c64389cae3ae3695c711e44']
      },
      'findOne'
    )
    mockingoose.Amend.toReturn({ ...amendMock, closed: false }, 'findOne')
    expect(
      await Amend.downVoteAmend('5c64389cae3ae3695c711e44', '29UH90D0H39')
    ).toHaveProperty('data')
  })
})

describe('indVoteAmend', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })
  test('User is not connected', async () => {
    mockingoose.User.toReturn(null, 'findOne')
    expect(
      await Amend.indVoteAmend('5c64389cae3ae3695c711e44', 'wrongToken')
    ).toMatchObject({
      error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
    })
  })

  test("User doesn't participate to the text", async () => {
    mockingoose.Amend.toReturn(amendMock, 'findOne')
    mockingoose.User.toReturn({ ...userMock, followedTexts: [] }, 'findOne')
    expect(
      await Amend.indVoteAmend('5c64389cae3ae3695c711e44', '29UH90D0H39')
    ).toMatchObject({
      error: {
        code: 405,
        message: 'Cet utilisateur ne participe pas au texte'
      }
    })
  })

  test('Amend is closed', async () => {
    mockingoose.User.toReturn(
      { ...userMock, followedTexts: ['5c64389cae3ae3695c711e44'] },
      'findOne'
    )
    mockingoose.Amend.toReturn({ ...amendMock, closed: true }, 'findOne')
    expect(
      await Amend.indVoteAmend('5c64389cae3ae3695c711e44', '29UH90D0H39')
    ).toMatchObject({
      error: { code: 405, message: 'Ce scrutin est terminé' }
    })
  })

  test('User already vote indifferent', async () => {
    mockingoose.User.toReturn(
      {
        ...userMock,
        indVotes: ['5c64389cae3ae3695c711e44'],
        followedTexts: ['5c64389cae3ae3695c711e44']
      },
      'findOne'
    )
    mockingoose.Amend.toReturn({ ...amendMock, closed: false }, 'findOne')
    expect(
      await Amend.indVoteAmend('5c64389cae3ae3695c711e44', '29UH90D0H39')
    ).toMatchObject({
      error: { code: 405, message: 'Vous avez déjà voté indifférent' }
    })
  })

  test('Return amend data', async () => {
    mockingoose.User.toReturn(
      {
        ...userMock,
        followedTexts: ['5c64389cae3ae3695c711e44']
      },
      'findOne'
    )
    mockingoose.Amend.toReturn({ ...amendMock, closed: false }, 'findOne')
    expect(
      await Amend.indVoteAmend('5c64389cae3ae3695c711e44', '29UH90D0H39')
    ).toHaveProperty('data')
  })
})

describe('unVoteAmend', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  test('User is not connected', async () => {
    mockingoose.User.toReturn(null, 'findOne')
    expect(await Amend.unVoteAmend('18G139HD03', 'wrongToken')).toMatchObject({
      error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
    })
  })

  test("User doesn't participate to the text", async () => {
    mockingoose.User.toReturn({ ...userMock, followedTexts: [] }, 'findOne')
    mockingoose.Amend.toReturn({ ...amendMock, closed: false }, 'findOne')
    expect(await Amend.unVoteAmend('18G139HD03', '19JH999HJD')).toMatchObject({
      error: {
        code: 405,
        message: 'Cet utilisateur ne participe pas à ce texte'
      }
    })
  })

  test('Amend is closed', async () => {
    mockingoose.User.toReturn(
      { ...userMock, followedTexts: ['5c64389cae3ae3695c711e44'] },
      'findOne'
    )
    mockingoose.Amend.toReturn({ ...amendMock, closed: true }, 'findOne')
    expect(await Amend.unVoteAmend('18G139HD03', '19JH999HJD')).toMatchObject({
      error: { code: 405, message: 'Ce scrutin est terminé' }
    })
  })

  test('Return amend data', async () => {
    mockingoose.User.toReturn(
      { ...userMock, followedTexts: ['5c64389cae3ae3695c711e44'] },
      'findOne'
    )
    mockingoose.Amend.toReturn({ ...amendMock, closed: false }, 'findOne')
    expect(await Amend.unVoteAmend('18G139HD03', '19JH999HJD')).toHaveProperty(
      'data'
    )
  })
})

describe('upVoteAmend', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  test('User is not connected', async () => {
    mockingoose.User.toReturn(null, 'findOne')
    expect(await Amend.upVoteAmend('18G139HD03', '19JH999HJD')).toMatchObject({
      error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
    })
  })

  test("User doesn't participate to the text", async () => {
    mockingoose.User.toReturn({ ...userMock, followedTexts: [] }, 'findOne')
    mockingoose.Amend.toReturn({ ...amendMock, closed: false }, 'findOne')
    expect(await Amend.upVoteAmend('18G139HD03', '19JH999HJD')).toMatchObject({
      error: {
        code: 405,
        message: 'Cet utilisateur ne participe pas au texte'
      }
    })
  })

  test('Amend is closed', async () => {
    mockingoose.User.toReturn(
      { ...userMock, followedTexts: ['5c64389cae3ae3695c711e44'] },
      'findOne'
    )
    mockingoose.Amend.toReturn({ ...amendMock, closed: true }, 'findOne')
    expect(
      await Amend.upVoteAmend('5c64389cae3ae3695c711e44', '19JH999HJD')
    ).toMatchObject({
      error: { code: 405, message: 'Ce scrutin est terminé' }
    })
  })

  test('User already vote for', async () => {
    mockingoose.User.toReturn(
      {
        ...userMock,
        followedTexts: ['5c64389cae3ae3695c711e44'],
        upVotes: ['5c64389cae3ae3695c711e44']
      },
      'findOne'
    )
    mockingoose.Amend.toReturn({ ...amendMock, closed: false }, 'findOne')
    expect(
      await Amend.upVoteAmend('5c64389cae3ae3695c711e44', '19JH999HJD')
    ).toMatchObject({
      error: { code: 405, message: 'Vous avez déjà voté pour' }
    })
  })

  test('Return amend data', async () => {
    mockingoose.User.toReturn(
      { ...userMock, followedTexts: ['5c64389cae3ae3695c711e44'] },
      'findOne'
    )
    mockingoose.Amend.toReturn({ ...amendMock, closed: false }, 'findOne')
    expect(
      await Amend.upVoteAmend('5c64389cae3ae3695c711e44', '19JH999HJD')
    ).toHaveProperty('data')
  })
})

describe('getAmend', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })
  test('User not connected', async () => {
    mockingoose.User.toReturn(null, 'findOne')
    expect(
      await Amend.postAmend(
        {
          name: 'test',
          description: 'test',
          patch: 'test',
          version: 1,
          textID: '5c64389cae3ae3695c711e44'
        },

        'wrongId'
      )
    ).toMatchObject({
      error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
    })
  })
  test('return new amend data', async () => {
    mockingoose.User.toReturn(userMock, 'findOne')
    mockingoose.Amend.toReturn(amendMock, 'findOne')
    mockingoose.Amend.toReturn(new Array(amendMock), 'find')
    mockingoose.Event.toReturn(new Array(eventMock), 'find')
    mockingoose.Text.toReturn(textMock, 'findOne')
    const res = await Amend.postAmend(
      {
        name: 'test',
        description: 'test',
        patch: 'test',
        version: 1,
        textID: '5c64389cae3ae3695c711e44'
      },
      'wrongId'
    )
    expect(res).toHaveProperty('data')
  })
})
