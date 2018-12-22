import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts'
import { Markdown } from '../components'
import { api } from '../utils'

const unFollowText = id => login => () => {
  fetch(api('/user/unFollowText/' + id), {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
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
  fetch(api('/user/followText/' + id), {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
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
          <div className="field is-grouped">
            <p className="control">
              {data.group && (
                <Link to={'/group/' + data.group._id} className="button">
                  <span className="icon">
                    <i className="fas fa-chevron-left" />
                  </span>
                  <span>Retour au groupe</span>
                </Link>
              )}
            </p>
            <p className="control">
              {isConnected() &&
                (user.followedTexts.find(id => id === data._id) ? (
                  <button
                    onClick={unFollowText(data._id)(login)}
                    className="button is-danger"
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
            </p>
          </div>

          <div className="box">
            <p>
              {data.group.name} | <strong>{data.name}</strong>
            </p>
            <p>Description : {data.description}</p>
            <p>Crée le : {new Date(data.created).toLocaleString()}</p>
          </div>

          <Markdown>{data.actual}</Markdown>
        </>
      )}
    </UserContext.Consumer>
  )
}
