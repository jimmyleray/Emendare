import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts'
import { Spacer } from '../components'
import { socket } from '../utils'

const unFollowGroup = id => () => {
  socket.fetch('unFollowGroup', { id }).then(() => {
    socket.emit('user')
  })
}

const followGroup = id => () => {
  socket.fetch('followGroup', { id }).then(() => {
    socket.emit('user')
  })
}

export const Group = ({ data }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, user }) => (
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
              (user.followedGroups.find(group => group._id === data._id) ? (
                <button
                  onClick={unFollowGroup(data._id)}
                  className="button is-danger is-outlined"
                >
                  Ne plus suivre ce groupe
                </button>
              ) : (
                <button
                  onClick={followGroup(data._id)}
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
                  <ul>
                    {data.subgroups.map(subgroup => (
                      <li key={subgroup._id}>
                        <Link to={'/groupe/' + subgroup._id}>
                          {subgroup.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {data.texts.length > 0 && (
                <>
                  <p>Textes</p>
                  <ul>
                    {data.texts.map(text => (
                      <li key={text._id}>
                        <Link to={'/texte/' + text._id}>{text.name}</Link>
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
