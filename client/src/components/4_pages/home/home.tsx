/*
 * Page d'acceuil
 * Le but de cette page est de permettre aux utilisateurs :
 * - de comprendre l'objectif de la plateforme
 * - d'accéder rapidement à la page d'exploration
 * - d'accèder rapidement à la page d'inscription
 */

import React from 'react'
import { Explore, Hero, Page } from '../../../components'

export const HomePage = () => (
  <Page title="Accueil">
    <Hero
      title="Emendare est une plateforme de rédaction de textes amendables"
      subtitle="Un amendement est une modification d'un texte, soumise au vote d'un groupe"
    />
    <Explore />
  </Page>
)
