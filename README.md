# [Emendare.org](https://emendare.org/) [![CircleCI](https://circleci.com/gh/jimmyleray/Emendare.svg?style=svg)](https://circleci.com/gh/jimmyleray/Emendare)

> Open source platform for drafting modifiable texts

[![CodeFactor](https://www.codefactor.io/repository/github/jimmyleray/emendare/badge)](https://www.codefactor.io/repository/github/jimmyleray/emendare) [![Codecov](https://img.shields.io/codecov/c/github/jimmyleray/Emendare.svg?style=flat)](https://codecov.io/gh/JimmyLeray/Emendare) ![Code Size](https://img.shields.io/github/languages/code-size/jimmyleray/Emendare.svg?style=flat) ![Last commit](https://img.shields.io/github/last-commit/jimmyleray/Emendare.svg?style=flat) [![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/jimmyleray/Emendare/issues) [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjimmyleray%2FEmendare.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjimmyleray%2FEmendare?ref=badge_shield)

## Tech / framework used

The current stack of this project is :

- Frontend side :

  - [ReactJS](https://reactjs.org/) as a framework for the client interface
  - [Bulma CSS](https://bulma.io/) as a css framework based on Flexbox

- Backend side :
  - [Node.js](https://nodejs.org/en/) for the API server and the application server
  - [Socket.io](https://socket.io/) for the client / server exchanges
  - [MongoDB](https://www.mongodb.com/en) as database

## Getting started

These instructions make it possible to create a copy of the project and to be able to execute it locally, for the development but also in production.

### Prerequisites

To set up the project installation, you must have **Node.js** installed.
To install Node.js, please refer to the [Node.js official documentation](https://nodejs.org/en/)

### Installation

The installation of the project requires 2 steps: a configuration of the server and another of the client.

#### Server configuration

The first step will be to create the MongoDB database. To do so just create a container containing a Mongo image, following the steps below.

```bash
cd server/
```

then creating the Mongo image :

```bash
docker-compose build
```

> This 'build' command is only to be done during installation.

and to finish throwing the container :

```bash
docker-compose start
```

The database is accessible at the following address: **localhost: 27017 / emendare**.

Once the database is in place we will be able to install the dependencies :

```bash
npm install
```

Then start the server either for production :

```bash
npm build
npm start
```

Either for development with these two tasks in parallel :

```bash
npm run build:watch
npm run dev
```

These commands are used to launch the server at the following address : **localhost:3030**

#### Client configuration

For the client installation the first step will be to install the dependencies.

```bash
cd client/
npm install
```

To launch the client, two solutions will be possible :

- in development :

```bash
npm run dev
```

- in production :

```bash
npm build
npm start
```

The app.js server will allow http redirection to https as well as Gzip compression of the application files.

## Contributions

To contribute to this project please refer to [Guide for contributors](https://github.com/jimmyleray/Emendare/blob/master/CONTRIBUTING.md)


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjimmyleray%2FEmendare.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjimmyleray%2FEmendare?ref=badge_large)
