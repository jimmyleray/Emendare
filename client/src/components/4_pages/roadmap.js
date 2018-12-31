import React from 'react'
import { Notification, Page } from '../../components'

export const RoadmapPage = () => (
  <Page title="Roadmap">
    <div className="field has-text-centered">
      <Notification className="is-warning">
        Vous pouvez participer à la rédaction participative de ce texte dans le{' '}
        <span className="has-text-weight-semibold">groupe Emendare</span>
      </Notification>
      <h1 className="is-size-3">Roadmap de la communauté</h1>
      <h2 className="is-size-5">Fonctionnalités à venir sur Emendare</h2>
      <br />
    </div>
  </Page>
)
