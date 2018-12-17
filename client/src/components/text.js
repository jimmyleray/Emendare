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
      {({ user, login }) => (
        <>
          {data.group && (
            <Link to={'/group/' + data.group._id}>Retour au groupe</Link>
          )}

          <p>
            {data.group.name} | <strong>{data.name}</strong>
          </p>
          <p>Description : {data.description}</p>
          <p>Crée le : {new Date(data.created).toLocaleString()}</p>
          {user &&
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
          <Markdown source={data.actual} />
        </>
      )}
    </UserContext.Consumer>
  )
}

/* <v-tooltip bottom v-if="user.followedTexts.find(id => id === text._id)">
            <v-btn @click="unFollowText()" slot="activator" icon>
              <v-icon color="warning" class="fas fa-star"></v-icon>
            </v-btn>
            <span>Ne plus suivre ce texte</span>
          </v-tooltip>
          <v-tooltip bottom v-if="!user.followedTexts.find(id => id === text._id)">
            <v-btn @click="followText()" slot="activator" icon>
              <v-icon color="warning" class="far fa-star"></v-icon>
            </v-btn>
            <span>Suivre ce texte</span>
          </v-tooltip>*/
