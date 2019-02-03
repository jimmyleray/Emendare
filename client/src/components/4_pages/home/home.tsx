/*
 * Page d'acceuil
 * Le but de cette page est de permettre aux utilisateurs :
 * - de comprendre l'objectif de la plateforme
 * - d'accéder rapidement à la page d'exploration
 * - d'accèder rapidement à la page d'inscription
 */

import React from 'react'
import { Explore, Page } from '../../../components'

export const HomePage = () => (
  <Page title="Accueil">
    <div className="field has-text-centered">
      <h1 className="is-size-3 has-text-weight-semibold">
        Emendare est une plateforme de rédaction de textes amendables
      </h1>
      <h2 className="is-size-4">
        Un amendement est une modification d'un texte, soumise au vote d'un
        groupe
      </h2>
      <p className="is-size-5">
        Vous pouvez parcourir ci-dessous l'ensemble des groupes disponibles sur
        Emendare
      </p>
    </div>
    <Explore />
  </Page>
)
