/*
 * Page d'actualités
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser les dernières actualités de la plateforme
 * - d'accéder rapidement aux pages ciblées par les actualités
 */

import React from 'react'
import { Page } from '../layouts'
import { Event } from '../components'
import { EventsContext } from '../contexts'

export const NewsPage = () => (
  <Page title="Actualités">
    <EventsContext.Consumer>
      {({ events }) => (
        <div className="has-text-centered">
          <p className="is-size-3">Fil d'actualités en direct</p>
          <br />
          {events &&
            events.map(event => <Event key={event._id} data={event} />)}
        </div>
      )}
    </EventsContext.Consumer>
  </Page>
)
