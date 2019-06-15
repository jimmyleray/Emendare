import mockingoose from 'mockingoose'
import { Text } from './Text'
import { textMock, userMock, eventMock } from '../../../../interfaces'

describe('followText', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  test('should return user not connected', async () => {
    mockingoose.User.toReturn(null, 'findOne')
    expect(await Text.followText('5c64389cae3ae3695c711e44', '')).toMatchObject(
      {
        error: {
          code: 401,
          message: "Cet utilisateur n'est pas connecté"
        }
      }
    )
    mockingoose.User.toReturn({ ...userMock, activated: false }, 'findOne')
    expect(
      await Text.followText('5c64389cae3ae3695c711e44', 'az200J')
    ).toMatchObject({
      error: {
        code: 401,
        message: "Cet utilisateur n'est pas connecté"
      }
    })
  })

  test('should return text already followed', async () => {
    mockingoose.User.toReturn(
      { ...userMock, followedTexts: ['5c64389cae3ae3695c711e44'] },
      'findOne'
    )
    mockingoose.Text.toReturn(null, 'findOne')
    expect(
      await Text.followText('5c64389cae3ae3695c711e44', 'uv65v76v6779b9')
    ).toMatchObject({
      error: { code: 405, message: 'Vous participez déjà à ce texte' }
    })
  })

  test('should return text data', async () => {
    mockingoose.User.toReturn(userMock, 'findOne')
    mockingoose.Text.toReturn(textMock, 'findOne')
    const res = await Text.followText(
      '5c64389cae3ae3695c711e44',
      'uv65v76v6779b9'
    )
    expect('data' in res).toBeTruthy()
  })
})

describe('unFollowText', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  test('should return user not connected', async () => {
    mockingoose.User.toReturn(null, 'findOne')
    expect(
      await Text.unFollowText('5c64389cae3ae3695c711e44', '')
    ).toMatchObject({
      error: {
        code: 401,
        message: "Cet utilisateur n'est pas connecté"
      }
    })
    mockingoose.User.toReturn({ ...userMock, activated: false }, 'findOne')
    expect(
      await Text.unFollowText('5c64389cae3ae3695c711e44', 'az200J')
    ).toMatchObject({
      error: {
        code: 401,
        message: "Cet utilisateur n'est pas connecté"
      }
    })
  })

  test('should return text is unfollowed', async () => {
    mockingoose.User.toReturn({ ...userMock }, 'findOne')
    mockingoose.Text.toReturn(null, 'findOne')
    expect(await Text.unFollowText('5c6438', 'uv65v76v6779b9')).toMatchObject({
      error: { code: 405, message: "Ce texte n'est pas suivi" }
    })
  })

  test('should return text data', async () => {
    mockingoose.User.toReturn(
      { ...userMock, followedTexts: ['5c64389cae3ae3695c711e44'] },
      'findOne'
    )
    mockingoose.Text.toReturn(textMock, 'findOne')
    const res = await Text.unFollowText(
      '5c64389cae3ae3695c711e44',
      'uv65v76v6779b9'
    )
    expect('data' in res).toBeTruthy()
  })
})

describe('postText', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  test('should return user not connected', async () => {
    mockingoose.User.toReturn(null, 'findOne')
    expect(
      await Text.postText({ name: 'test', description: 'test' }, '')
    ).toMatchObject({
      error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
    })
    mockingoose.User.toReturn({ ...userMock, activated: false }, 'findOne')
    expect(
      await Text.postText({ name: 'test', description: 'test' }, '77g96g983Edz')
    ).toMatchObject({
      error: {
        code: 401,
        message: "Cet utilisateur n'est pas connecté"
      }
    })
  })

  test('should return text, texts and event data', async () => {
    mockingoose.User.toReturn({ ...userMock, activated: true }, 'findOne')
    mockingoose.Text.toReturn(textMock, 'findOne')
    mockingoose.Text.toReturn(new Array(textMock), 'find')
    mockingoose.Event.toReturn(new Array(eventMock), 'find')
    const res = await Text.postText(
      { name: 'test', description: 'test' },
      '77g96g983Edz'
    )
    expect(res).toHaveProperty('data')
  })
})

describe('getTexts', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })
  test('should return error', async () => {
    mockingoose.Text.toReturn(null, 'findOne')
    expect(await Text.getTexts()).toMatchObject({
      error: {
        code: 405,
        message: "Oups, il y'a eu une erreur"
      }
    })
  })

  test('should return data related to the text', async () => {
    mockingoose.Text.toReturn(new Array(textMock), 'find')
    expect(await Text.getTexts()).toHaveProperty('data')
  })
})

describe('getText', () => {
  beforeEach(() => {
    mockingoose.resetAll()
  })

  test('should return error', async () => {
    mockingoose.Text.toReturn(null, 'findOne')
    expect(await Text.getText('wrongId')).toMatchObject({
      error: {
        code: 404,
        message: "Oups, ce texte n'existe pas ou plus"
      }
    })
  })

  test('should return data related to the text', async () => {
    mockingoose.Text.toReturn(textMock, 'findOne')
    expect(await Text.getText('5c64389cae3ae3695c711e44')).toHaveProperty(
      'data'
    )
  })
})
