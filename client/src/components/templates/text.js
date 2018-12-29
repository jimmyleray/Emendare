import React from 'react'
import { Link } from 'react-router-dom'
import { Results, Spacer, UserContext } from '../../components'
import { socket } from '../../services'

const unFollowText = id => async () => {
  await socket.fetch('unFollowText', { id })
  socket.emit('user')
}

const followText = id => async () => {
  await socket.fetch('followText', { id })
  socket.emit('user')
}

export const Text = ({ data }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, user }) => (
        <>
          <div className="buttons">
            {data.group && (
              <Link to={'/groupe/' + data.group._id} className="button">
                <span className="icon">
                  <i className="fas fa-chevron-left" />
                </span>
                <span>Retour au groupe</span>
              </Link>
            )}

            <Spacer />

            {isConnected() && (
              <Link
                to={'/editer/' + data._id}
                className="button is-info"
                disabled={data.rules}
              >
                <span className="icon">
                  <i className="fas fa-plus" />
                </span>
                <span>Proposer un amendement</span>
              </Link>
            )}

            {isConnected() &&
              (user.followedTexts.find(text => text._id === data._id) ? (
                <button
                  onClick={unFollowText(data._id)}
                  className="button is-danger is-outlined"
                  disabled={data.rules}
                >
                  Ne plus suivre ce texte
                </button>
              ) : (
                <button
                  onClick={followText(data._id)}
                  className="button is-success"
                  disabled={data.rules}
                >
                  Suivre ce texte
                </button>
              ))}
          </div>
          <div className="columns">
            <div className="column">
              <div className="box">
                <p>
                  {data.rules ? 'Paramètres' : data.group.name} |{' '}
                  <strong>{data.rules ? data.group.name : data.name}</strong>
                </p>
                <p>
                  {data.rules
                    ? 'Règles du groupe ' + data.group.name
                    : data.description}
                </p>
                <p>
                  {data.version +
                    ' amendement' +
                    (data.version > 1 ? 's' : '') +
                    ' accepté' +
                    (data.version > 1 ? 's' : '')}
                </p>
              </div>

              <div>
                {data.actual
                  .split('\n')
                  .map((line, index) =>
                    line ? <p key={index}>{line}</p> : <br key={index} />
                  )}
              </div>
            </div>
            <div className="column">
              <div className="box">
                <p className="is-size-5 has-text-centered has-text-weight-semibold">
                  Vote en cours sur l'amendement
                </p>
                <Results value={54.7} />
              </div>
              <div className="box">
                <p>Liste des amendements proposés</p>
                <ul>
                  {data.amends.map(amend => (
                    <li key={amend._id}>
                      <Link to={'/amendement/' + amend._id}>{amend.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </UserContext.Consumer>
  )
}
