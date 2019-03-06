/* eslint-disable sonarjs/cognitive-complexity */

/*
 * Page de détails d'un amendement
 * Le but de cette page est de permettre aux utilisateurs :
 * - d'accéder au détail d'un amendement
 * - TODO : de visualiser le vote de l'amendement
 * - TODO : de participer au vote sur l'amendement
 */

import React from 'react'
import {
  Amend,
  ResultAmend,
  Column,
  Columns,
  Hero,
  ErrorPage,
  Link,
  Notification,
  Page,
  Results,
  DataContext,
  UserContext,
  CountDown,
  I18nContext,
  Vote
} from '../../../components'
import { Time } from '../../../services'
import { path } from '../../../config'
import { useTabs } from '../../../hooks'
import { IText, IAmend, IResponse } from '../../../../../interfaces'

export const AmendPage = ({ match }: any) => {
  const {
    selectedTab,
    setSelectedTab,
    selectNextTab,
    selectPreviousTab
  } = useTabs(['amend', 'arguments', 'vote'], 0)

  React.useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        selectNextTab()
      } else if (event.key === 'ArrowLeft') {
        selectPreviousTab()
      }
    }

    document.addEventListener('keyup', eventHandler)
    return () => {
      document.removeEventListener('keyup', eventHandler)
    }
  })

  const { translate } = React.useContext(I18nContext)
  const { get } = React.useContext(DataContext)
  const { user } = React.useContext(UserContext)

  const amend: IResponse<IAmend> = get('amend')(match.params.id)
  const text: IResponse<IText> =
    amend && amend.data && get('text')(amend.data.text)

  if (amend && amend.error) {
    return <ErrorPage error={amend.error} />
  }

  if (text && text.error) {
    return <ErrorPage error={text.error} />
  }

  if (amend && amend.data && text && text.data) {
    const amendIndex = text.data.amends.indexOf(amend.data._id)

    return (
      <Page
        title={
          text && text.data ? 'Amendement sur ' + text.data.name : 'Amendement'
        }
      >
        <Hero
          title={
            <React.Fragment>
              Amendement n°{amendIndex + 1} sur{' '}
              <Link
                to={{
                  pathname: path.text(amend.data.text),
                  search: '?tab=votes'
                }}
              >
                {text.data.name}
              </Link>
            </React.Fragment>
          }
          subtitle={amend.data.name}
          className="has-text-centered"
        />
        <div className="tabs is-boxed is-fullwidth ">
          <ul>
            <li className={selectedTab === 'amend' ? 'is-active' : ''}>
              <a
                onClick={() => {
                  setSelectedTab('amend')
                }}
              >
                {translate('AMEND')}
              </a>
            </li>
            <li className={selectedTab === 'arguments' ? 'is-active' : ''}>
              <a
                onClick={() => {
                  setSelectedTab('arguments')
                }}
              >
                {translate('ARGUMENTS')}
              </a>
            </li>
            <li className={selectedTab === 'vote' ? 'is-active' : ''}>
              <a
                onClick={() => {
                  setSelectedTab('vote')
                }}
              >
                {translate('VOTE')}
              </a>
            </li>
          </ul>
        </div>
        {selectedTab === 'amend' && (
          <React.Fragment>
            <Amend amend={amend.data} text={text.data} />
            {(!amend.data.closed || user) && (
              <Vote
                amend={amend.data}
                user={user}
                match={match}
                className="is-centered "
                style={{ marginTop: '2rem' }}
              />
            )}
          </React.Fragment>
        )}
        {selectedTab === 'arguments' && (
          <Notification className="is-warning">
            Cette fonctionnalité sera bientôt disponible et vous permettra de
            lire les arguments des autres participants, et de noter les plus
            pertinents.
          </Notification>
        )}
        {selectedTab === 'vote' && (
          <Columns>
            <Column className="is-centered">
              {user && (
                <React.Fragment>
                  <p
                    className="is-size-5 has-text-centered has-text-weight-semibold"
                    style={{ paddingBottom: '2rem' }}
                  >
                    Détail du résultat
                  </p>
                  <ResultAmend amend={amend.data} />
                  <br />
                </React.Fragment>
              )}
              {!amend.data.closed && (
                <React.Fragment>
                  <br />
                  <Notification className="is-light">
                    <p>
                      Le vote est{' '}
                      <span className="has-text-weight-semibold">
                        clos à la fin du temps maximum
                      </span>{' '}
                      OU dès lors qu'une{' '}
                      <span className="has-text-weight-semibold">
                        majorité absolue
                      </span>{' '}
                      est atteinte après un delai minimum. Le{' '}
                      <span className="has-text-weight-semibold">
                        vote est liquide
                      </span>
                      , vous pouvez donc changer votre vote jusqu'à la fin du
                      vote.
                    </p>
                  </Notification>
                </React.Fragment>
              )}
            </Column>
            <Column>
              <div className="has-text-centered">
                {amend.data.closed ? (
                  <React.Fragment>
                    <p className="is-size-4">Le vote est clos</p>
                    <p className="has-text-weight-semibold is-size-3">
                      {amend.data.accepted && !amend.data.conflicted
                        ? 'ACCEPTE'
                        : 'REFUSE'}
                    </p>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <p className="is-size-4">Temps restant</p>
                    <CountDown
                      date={Time.addTimeToDate(
                        amend.data.created,
                        amend.data.rules.delayMax
                      )}
                      className="has-text-weight-semibold is-size-3"
                    />
                  </React.Fragment>
                )}
              </div>
              <br />

              <Results
                data={{
                  up: amend.data.results.upVotesCount,
                  down: amend.data.results.downVotesCount,
                  ind: amend.data.results.indVotesCount,
                  absent:
                    (amend.data.results.totalPotentialVotesCount
                      ? amend.data.results.totalPotentialVotesCount
                      : text.data.followersCount) -
                    (amend.data.results.upVotesCount +
                      amend.data.results.downVotesCount +
                      amend.data.results.indVotesCount)
                }}
              />

              <br />
              <p className="is-size-5 has-text-centered">
                Répartition des votes exprimés et participation
              </p>
              <br />

              {amend.data.closed && amend.data.conflicted && (
                <React.Fragment>
                  <br />
                  <p className="has-text-centered has-text-danger has-text-weight-semibold">
                    Des conflits ont été détectés à l'application de
                    l'amendement. Une nouvelle fonctionalité permettra
                    prochainement aux auteurs des amendements de corriger ces
                    conflits avant les votes.
                  </p>
                </React.Fragment>
              )}
            </Column>
          </Columns>
        )}
      </Page>
    )
  }

  return null
}
