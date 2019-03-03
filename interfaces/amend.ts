export interface IArgument {
  created: Date | string;
  text: string;
  type: string;
  upVotesCount: number;
}

export interface IAmend {
  __v: number;
  _id: string;
  created: Date | string;
  finised: Date | string;
  name: string;
  description: string;
  patch: string | null;
  version: number;
  text: string;
  arguments: IArgument[];
  results: {
    upVotesCount: number;
    downVotesCount: number;
    indVotesCount: number;
    totalPotentialVotesCount: number | undefined;
  };
  rules: {
    delayMin: number;
    delayMax: number;
  };
  closed: boolean;
  accepted: boolean;
  conflicted: boolean;
  save?: any;
}

export const amendMock: IAmend = {
  __v: 0,
  _id: "5c64389cae3ae3695c711e44",
  created: "2019-02-13T15:32:44.344Z",
  finised: "2019-02-13T15:42:44.344Z",
  name: "test",
  description: "test",
  patch:
    "Index: \n===================================================================\n--- \t\n+++ \t\n@@ -1,0 +1,11 @@\n\\ No newline at end of file\n+Choses à ajouter :\n+- possibilité d'argumenter ses votes\n+\n+Choses à supprimer :\n+- \n+\n+Choses à modifier / améliorer :\n+- \n+\n+Cette disposition du texte est donnée à titre indicatif et peut tout à fait faire l'objet d'amendements.\n+Les utilisateurs sont parfaitement libres de proposer les modifications qu'ils souhaitent.\n\\ No newline at end of file\n",
  version: 0,
  text: "5c64389cae3ae3695c711e44",
  arguments: [
    {
      created: "2019-02-13T15:42:44.344Z",
      text: "Test",
      type: "UP",
      upVotesCount: 5
    }
  ],
  results: {
    upVotesCount: 0,
    downVotesCount: 0,
    indVotesCount: 0,
    totalPotentialVotesCount: 0
  },
  rules: {
    delayMin: 1000,
    delayMax: 10000
  },
  closed: true,
  accepted: false,
  conflicted: false
};
