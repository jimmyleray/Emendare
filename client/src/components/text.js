import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts'
import { Spacer } from '../components'
import { apiFetch } from '../utils'

const unFollowText = fetchUser => id => () => {
  apiFetch('/user/unFollowText/' + id, { method: 'post' }).then(async res => {
    if (res.status === 200) {
      fetchUser()
    }
  })
}

const followText = fetchUser => id => () => {
  apiFetch('/user/followText/' + id, { method: 'post' }).then(async res => {
    if (res.status === 200) {
      fetchUser()
    }
  })
}

export const Text = ({ data }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, user, fetchUser }) => (
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
                to={'/amendement/ajouter/' + data._id}
                className="button is-info"
              >
                <span className="icon">
                  <i className="fas fa-plus" />
                </span>
                <span>Proposer un amendement</span>
              </Link>
            )}

            {isConnected() &&
              (user.followedTexts.find(id => id === data._id) ? (
                <button
                  onClick={unFollowText(fetchUser)(data._id)}
                  className="button is-danger is-outlined"
                >
                  Ne plus suivre ce texte
                </button>
              ) : (
                <button
                  onClick={followText(fetchUser)(data._id)}
                  className="button is-success"
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
                <p>Vote en cours sur le texte</p>
              </div>
              <div className="box">
                <p>Liste des amendements proposés</p>
                {data.amends.map(amend => (
                  <p>{amend.name}</p>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </UserContext.Consumer>
  )
}
