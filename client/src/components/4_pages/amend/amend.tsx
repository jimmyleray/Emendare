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
  Button,
  Buttons,
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
  I18nContext
} from '../../../components'
import { Socket, Time } from '../../../services'
import { path } from '../../../config'
import { useTabs } from '../../../hooks'

const isOutlined = 'is-outlined'

const vote = (user: any) => (amend: any) => (type: string) => (
  id: string
) => async () => {
  const textID = amend.text
  if (user.followedTexts.indexOf(textID) === -1) {
    await Socket.fetch('followText', { id: textID })
  }

  await Socket.fetch(type + 'VoteAmend', { id })
  Socket.emit('user')
}

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

  const amend = get('amend')(match.params.id)
  const text = amend && amend.data && get('text')(amend.data.text)

  if (amend && amend.error) {
    return <ErrorPage error={amend.error} />
  }

  if (text && text.error) {
    return <ErrorPage error={text.error} />
  }

  if (amend && amend.data && text && text.data) {
    return (
      <Page
        title={
          text && text.data ? 'Amendement sur ' + text.data.name : 'Amendement'
        }
      >
        <Hero
          title={
            <React.Fragment>
              Amendement sur{' '}
              <Link to={path.text(amend.data.text)}>{text.data.name}</Link>
            </React.Fragment>
          }
          subtitle={amend.data.name}
          className="has-text-centered"
        />
        <div className="tabs is-boxed is-fullwidth">
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
          <Amend amend={amend.data} text={text.data} />
        )}
        {selectedTab === 'arguments' && null}
        {selectedTab === 'vote' && (
          <Columns>
            <Column>
              <div className="has-text-centered">
                {amend.data.closed ? (
                  <React.Fragment>
                    <p className="is-size-4">Le scrutin est clos</p>
                    <p className="has-text-weight-semibold is-size-3">
                      {amend.data.accepted && !amend.data.conflicted
                        ? 'ACCEPTE'
                        : 'REFUSE'}
                    </p>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <p>Temps restant</p>
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
                    conflits avant les scrutins.
                  </p>
                </React.Fragment>
              )}
            </Column>
            <Column>
              {user && (
                <React.Fragment>
                  <p className="is-size-5 has-text-centered has-text-weight-semibold">
                    Vos options de vote
                  </p>
                  <br />
                  <Buttons className="is-fullwidth" style={{ marginBottom: 0 }}>
                    <Button
                      className={
                        'is-success ' +
                        (!user.upVotes.includes(amend.data._id)
                          ? isOutlined
                          : '')
                      }
                      disabled={amend.data.closed}
                      onClick={vote(user)(amend.data)('up')(match.params.id)}
                      style={{ flex: 1 }}
                      title="Vous êtes favorable à cet amendement"
                    >
                      Je soutiens cette modification
                    </Button>
                  </Buttons>
                  <Buttons className="is-fullwidth" style={{ marginBottom: 0 }}>
                    <Button
                      className={
                        'is-danger ' +
                        (!user.downVotes.includes(amend.data._id)
                          ? isOutlined
                          : '')
                      }
                      disabled={amend.data.closed}
                      onClick={vote(user)(amend.data)('down')(match.params.id)}
                      style={{ flex: 1 }}
                      title="Vous êtes défavorable à cet amendement"
                    >
                      Je préfère la version actuelle
                    </Button>
                  </Buttons>
                  <Buttons className="is-fullwidth" style={{ marginBottom: 0 }}>
                    <Button
                      className={
                        'is-info ' +
                        (!user.indVotes.includes(amend.data._id)
                          ? isOutlined
                          : '')
                      }
                      disabled={amend.data.closed}
                      onClick={vote(user)(amend.data)('ind')(match.params.id)}
                      style={{ flex: 1 }}
                      title="Vous êtes indifférent au résultat de ce scrutin"
                    >
                      Je suis indifférent
                    </Button>
                  </Buttons>
                  <Buttons className="is-fullwidth" style={{ marginBottom: 0 }}>
                    <Button
                      className={
                        'is-dark ' +
                        (user.upVotes.includes(amend.data._id) ||
                        user.downVotes.includes(amend.data._id) ||
                        user.indVotes.includes(amend.data._id)
                          ? isOutlined
                          : '')
                      }
                      disabled={amend.data.closed}
                      onClick={vote(user)(amend.data)('un')(match.params.id)}
                      style={{ flex: 1 }}
                      title="Vous ne souhaitez pas voter à ce scrutin"
                    >
                      Je m'abstiens
                    </Button>
                  </Buttons>
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
                      scrutin.
                    </p>
                  </Notification>
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
