# [Emendare.org](https://emendare.org/) [![CircleCI](https://circleci.com/gh/jimmyleray/Emendare.svg?style=svg)](https://circleci.com/gh/jimmyleray/Emendare)

> Open source platform for drafting modifiable texts

[![CodeFactor](https://www.codefactor.io/repository/github/jimmyleray/emendare/badge)](https://www.codefactor.io/repository/github/jimmyleray/emendare) [![BCH compliance](https://bettercodehub.com/edge/badge/jimmyleray/Emendare?branch=develop)](https://bettercodehub.com/) [![Codecov](https://img.shields.io/codecov/c/github/jimmyleray/Emendare.svg?style=flat)](https://codecov.io/gh/JimmyLeray/Emendare) ![Code Size](https://img.shields.io/github/languages/code-size/jimmyleray/Emendare.svg?style=flat) ![Last commit](https://img.shields.io/github/last-commit/jimmyleray/Emendare.svg?style=flat) [![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/jimmyleray/Emendare/issues) [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Philosophy

Emendare is a citizen, non-profit, distributed, and open source initiative to enable self-organized groups to write common texts. The tool stands out by miming the functioning of a parliament by allowing all participants to propose changes to a text. These proposals are called amendments, and we say that we are amending a text. The platform takes its name from the verb amend which is called Emendare in Latin. The tool is aimed at all groups seeking to organize themselves horizontally, be they companies, associations, political movements or local authorities. Emendare is particularly suitable for writing texts over time, iteratively.

## Technical stack

The current stack of this project is :

- Frontend side :

  - [ReactJS](https://reactjs.org/) as a framework for the client interface
  - [Bulma CSS](https://bulma.io/) as a css framework based on Flexbox

- Backend side :
  - [Node.js](https://nodejs.org/en/) for the API server and the application server
  - [Socket.io](https://socket.io/) for the client / server exchanges
  - [MongoDB](https://www.mongodb.com/en) as database

## Getting started

These instructions explain how to run a local instance of Emendare for development, but also how to build the application for production.

### Prerequisites

To set up the project, you must have **Node.js** installed.
To install Node.js, please refer to the [Node.js official documentation](https://nodejs.org/en/)

You can optionnaly install Docker-Compose to start more easily the Mongo database.
To install Docker-Compose, please refer to the [Docker Compose official documentation](https://docs.docker.com/compose/install/)

### Installation

The installation of the project requires 2 steps: a configuration of the server and another of the client.

#### Server configuration

The first step will be to create the MongoDB database. To do so, just create a docker container with a Mongo image, following the steps below.

```bash
cd server/
```

then create the Mongo image :

```bash
docker-compose build
```

> This 'build' command must only be entered during installation.

you can finaly run the container :

```bash
docker-compose up
```

The database is accessible at the following address: **localhost: 27017 / emendare**.

Once the database is set up, the dependencies can be installed :

```bash
npm install
```

Then start the server either for production :

```bash
npm run build
npm start
```

Or for development (run these commands in two separates terminals) :

```bash
npm run build:watch
```

```bash
npm run dev
```

These commands will start the server at the following address : **localhost:3030**

#### Client configuration

To run the client, the first step will be to install the dependencies.

```bash
cd client/
npm install
```

The client can now be started in two modes :

- in development :

```bash
npm run dev
```

- in production :

```bash
npm run build
npm start
```

The app.js server will allow http redirection to https as well as Gzip compression of the application files.

## Contributions

To contribute to this project please refer to [Guide for contributors](https://github.com/jimmyleray/Emendare/blob/master/CONTRIBUTING.md)
