import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts'
import { Markdown, Spacer } from '../components'
import { apiFetch } from '../utils'

const unFollowText = id => login => () => {
  apiFetch('/user/unFollowText/' + id, {
    method: 'post',
    body: JSON.stringify({
      token: localStorage.getItem('user-token')
    })
  }).then(async res => {
    if (res.status === 200) {
      const user = await res.json()
      login(user)
    }
  })
}

const followText = id => login => () => {
  apiFetch('/user/followText/' + id, {
    method: 'post',
    body: JSON.stringify({
      token: localStorage.getItem('user-token')
    })
  }).then(async res => {
    if (res.status === 200) {
      const user = await res.json()
      login(user)
    }
  })
}

export const Text = ({ data }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, user, login }) => (
        <>
          <div className="buttons">
            {data.group && (
              <Link to={'/group/' + data.group._id} className="button">
                <span className="icon">
                  <i className="fas fa-chevron-left" />
                </span>
                <span>Retour au groupe</span>
              </Link>
            )}

            <Spacer />

            {isConnected() && (
              <Link to={'/amend/' + data._id} className="button is-info">
                <span className="icon">
                  <i className="fas fa-plus" />
                </span>
                <span>Proposer un amendement</span>
              </Link>
            )}

            {isConnected() &&
              (user.followedTexts.find(id => id === data._id) ? (
                <button
                  onClick={unFollowText(data._id)(login)}
                  className="button is-danger is-outlined"
                >
                  Ne plus suivre ce texte
                </button>
              ) : (
                <button
                  onClick={followText(data._id)(login)}
                  className="button is-success"
                >
                  Suivre ce texte
                </button>
              ))}
          </div>

          <div className="box">
            <p>
              {data.rules ? 'Paramètres' : data.group.name} |{' '}
              <strong>{data.rules ? data.group.name : data.name}</strong>
            </p>
            <p>
              Description :{' '}
              {data.rules
                ? 'Règles du groupe ' + data.group.name
                : data.description}
            </p>
            <p>Crée le : {new Date(data.created).toLocaleString()}</p>
          </div>

          <Markdown>{data.actual}</Markdown>
        </>
      )}
    </UserContext.Consumer>
  )
}
