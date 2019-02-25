export type languages = 'EN' | 'FR'

export type translateKey = 'HOME_TITLE' | 'HOME_SUBTITLE'

interface ITranslations {
  [key: string]: { [language: string]: string }
}

export const translations: ITranslations = {
  HOME_TITLE: {
    FR: 'Emendare est une plateforme de rédaction de textes amendables',
    EN: 'Emendare is a writing platform for modifiable texts'
  },
  HOME_SUBTITLE: {
    FR:
      "Un amendement est une modification d'un texte, soumise au vote d'un groupe",
    EN:
      'An amendment is a modification of a text, submitted to the vote of a group'
  }
}
