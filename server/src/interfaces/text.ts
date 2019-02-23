export interface IText {
  __v: number
  _id: string
  created: Date | string
  name: string
  description: string
  followersCount: number
  actual: string
  patches: string[]
  amends: string[]
  rules: boolean
  save?: any
}

export const textMock: IText = {
  __v: 0,
  _id: '5c64389cae3ae3695c711e44',
  created: '2019-02-13T15:32:44.344Z',
  name: 'test',
  description: 'test',
  followersCount: 0,
  actual: 'test',
  patches: [
    "Index: \n===================================================================\n--- \t\n+++ \t\n@@ -1,0 +1,11 @@\n\\ No newline at end of file\n+Choses à ajouter :\n+- possibilité d'argumenter ses votes\n+\n+Choses à supprimer :\n+- \n+\n+Choses à modifier / améliorer :\n+- \n+\n+Cette disposition du texte est donnée à titre indicatif et peut tout à fait faire l'objet d'amendements.\n+Les utilisateurs sont parfaitement libres de proposer les modifications qu'ils souhaitent.\n\\ No newline at end of file\n"
  ],
  amends: [],
  rules: false
}
