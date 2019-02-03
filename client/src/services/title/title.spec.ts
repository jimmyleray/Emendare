import { Title } from './title'

test('Title has some utils methods', () => {
  expect(Title.documentTitle).toBe('Emendare')
  Title.pageTitle = 'Test'
  expect(Title.documentTitle).toBe('Emendare | Test')
  Title.badgeCount = 2
  expect(Title.documentTitle).toBe('(2) Emendare | Test')
  Title.pageTitle = 'Accueil'
  expect(Title.documentTitle).toBe('(2) Emendare | Accueil')
  Title.badgeCount = 0
  expect(Title.documentTitle).toBe('Emendare | Accueil')
  Title.pageTitle = ''
  expect(Title.documentTitle).toBe('Emendare')
})
