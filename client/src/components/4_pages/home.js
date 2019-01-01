/*
 * Page d'acceuil
 * Le but de cette page est de permettre aux utilisateurs :
 * - de comprendre l'objectif de la plateforme
 * - d'accéder rapidement à la page d'exploration
 * - d'accèder rapidement à la page d'inscription
 */

import React from 'react'
import { Button, Buttons, Notification, Page } from '../../components'
import { path } from '../../config'

export const HomePage = () => (
  <Page title="Accueil">
    <Notification className="is-warning has-text-centered">
      <p>
        <span className="has-text-weight-semibold">Version alpha</span> ouverte
        depuis le 7 Janvier 2019 uniquement pour les mails se terminant par{' '}
        <span className="has-text-weight-semibold">@zenika.com</span>
      </p>
      <p>
        Pour participer au développement, vous pouvez rejoindre le channel{' '}
        <span className="has-text-weight-semibold">#emendare</span> sur le slack
        Zenika
      </p>
      <p>
        Attention il est possible que les données soient réinitalisées pendant
        cette première phase de test
      </p>
    </Notification>

    <div className="field has-text-centered">
      <h1 className="is-size-3">
        Plateforme open source de rédaction de textes amendables
      </h1>
      <h2 className="is-size-5">
        Un amendement est une modification d'un texte, soumise au vote d'un
        groupe
      </h2>
    </div>
    <Buttons style={{ justifyContent: 'center' }}>
      <Button to={path.explore} className="is-medium is-link">
        Découvrir Emendare
      </Button>
      <Button to={path.code} className="is-medium is-info">
        Pourquoi Emendare
      </Button>
      <Button to={path.subscribe} className="is-medium is-primary">
        Créer votre compte
      </Button>
    </Buttons>
  </Page>
)
