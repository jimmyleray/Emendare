# Emendare

> Plateforme open source de rédaction de textes amendables

[![CircleCI](https://circleci.com/gh/jimmyleray/Emendare.svg?style=svg)](https://circleci.com/gh/jimmyleray/Emendare) [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://gitlab.com/emendare/emendare/issues) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/0a1f29651edb493ba197fd794d4bc5d4)](https://www.codacy.com/app/jimmy.leray/Emendare?utm_source=github.com&utm_medium=referral&utm_content=JimmyLeray/Emendare&utm_campaign=Badge_Grade)

## Tech/framework utilisés

La stack actuelle de ce projet est la suivante :

- Coté Frontend :

  - [ReactJS](https://reactjs.org/) comme framework pour l'interface client
  - [Bulma CSS](https://bulma.io/) comme framework css

- Coté Backend :
  - [Node.js](https://nodejs.org/en/) pour le serveur de l'API et le serveur de l'application
  - [Socket.io](https://socket.io/) pour l'échange client/server
  - [MongoDB](https://www.mongodb.com/fr) comme base de données

## Mise en place

Ces instructions permettent de créer une copie du projet et de pouvoir l'éxecuter en local, pour le développement mais aussi en production.

### Pré-requis

Pour mettre en place l'installation du projet, il faut avoir **Node.js** d'installé.
Pour installer Node.js, veuillez vous référencer à la documentation officielle : [Node.js](https://nodejs.org/en/)

### Installation

L'installation du projet nécéssite 2 étapes : une configuration du serveur et une autre du client

#### Configuration du serveur

La première étape va être de créer la base de données MongoDB. Pour ce faire il suffit de créer un container contenant une image mongo.

```
cd server/
```

puis création de l'image mongo

```
docker-compose build
```

> Cette commande 'build' est seulement à faire lors de l'installation.

et pour finir lancer le container

```
docker-compose start
```

La base de données est accessible à l'adresse suivante : **localhost:27017/emendare**

Une fois la base de données en place nous allons pouvoir installer les dépendances

```
npm install
```

Puis démarrer le serveur soit pour la production

```
npm build
npm start
```

Soit pour le développement avec ces deux tâches en parallèle

```
npm run build:watch
npm run dev
```

Cette commande permet de lancer le serveur à l'adresse suivante : **localhost:3030**

#### Configuration du client

Pour l'installation du client la première étape va être d'installer les dépendances.

```
cd client/
npm install
```

Pour lancer le client, deux solutions vont être possibles:

- en development :

```
npm run dev
```

- en production :

```
npm build
npm start
```

Le serveur app.js va permettre la redirection http vers https ainsi que la compression Gzip des fichiers de l'application.

## Contribution

Pour contribuer à ce projet veuillez vour référencer au [Guide pour les contributeurs](https://gitlab.com/emendare/emendare/blob/master/CONTRIBUTING.md)
