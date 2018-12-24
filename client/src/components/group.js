import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts'
import { Spacer } from '../components'
import { apiFetch } from '../utils'

const unFollowGroup = fetchUser => id => () => {
  apiFetch('/user/unFollowGroup/' + id, { method: 'post' }).then(async res => {
    if (res.status === 200) {
      fetchUser()
    }
  })
}

const followGroup = fetchUser => id => () => {
  apiFetch('/user/followGroup/' + id, { method: 'post' }).then(async res => {
    if (res.status === 200) {
      fetchUser()
    }
  })
}

export const Group = ({ data }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, user, fetchUser }) => (
        <>
          <div className="buttons">
            {data.parent && (
              <Link to={'/groupe/' + data.parent._id} className="button">
                <span className="icon">
                  <i className="fas fa-chevron-left" />
                </span>
                <span>Retour au groupe parent</span>
              </Link>
            )}

            <Spacer />

            {isConnected() && (
              <Link to={'/texte/' + data.rules._id} className="button is-info">
                <span className="icon">
                  <i className="fas fa-cog" />
                </span>
                <span>Voir les règles du groupe</span>
              </Link>
            )}

            {isConnected() &&
              (user.followedGroups.find(id => id === data._id) ? (
                <button
                  onClick={unFollowGroup(fetchUser)(data._id)}
                  className="button is-danger is-outlined"
                >
                  Ne plus suivre ce groupe
                </button>
              ) : (
                <button
                  onClick={followGroup(fetchUser)(data._id)}
                  className="button is-success"
                >
                  Suivre ce groupe
                </button>
              ))}
          </div>

          <div className="columns">
            <div className="column">
              <div className="box">
                <p className="has-text-weight-bold">{data.name}</p>
                <p>{data.description}</p>
              </div>

              {data.subgroups.length > 0 && (
                <>
                  <p>Groupes</p>
                  {data.subgroups.map(subgroup => (
                    <Link key={subgroup._id} to={'/groupe/' + subgroup._id}>
                      {subgroup.name} : {subgroup.description}
                    </Link>
                  ))}
                </>
              )}

              {data.texts.length > 0 && (
                <>
                  <p>Textes</p>
                  <ul>
                    {data.texts.map(text => (
                      <li key={text._id}>
                        <Link to={'/texte/' + text._id}>
                          {text.name} : {text.description}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="column">
              <div className="box">
                <p>Votes en cours dans le groupe</p>
              </div>
            </div>
          </div>
        </>
      )}
    </UserContext.Consumer>
  )
}
