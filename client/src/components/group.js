import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts'
import { api } from '../utils'

const unFollowGroup = id => login => () => {
  fetch(api('/user/unFollowGroup/' + id), {
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

const followGroup = id => login => () => {
  fetch(api('/user/followGroup/' + id), {
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

export const Group = ({ data }) => {
  return (
    <UserContext.Consumer>
      {({ user, login }) => (
        <>
          {data.parent && (
            <Link to={'/group/' + data.parent._id}>
              Retour au groupe parent
            </Link>
          )}

          <p>Description : {data.description}</p>
          <p>Crée le : {new Date(data.created).toLocaleString()}</p>

          {user &&
            (user.followedGroups.find(id => id === data._id) ? (
              <button
                onClick={unFollowGroup(data._id)(login)}
                className="button is-danger"
              >
                Ne plus suivre ce groupe
              </button>
            ) : (
              <button
                onClick={followGroup(data._id)(login)}
                className="button is-success"
              >
                Suivre ce groupe
              </button>
            ))}

          {data.subgroups.length > 0 && (
            <>
              <p>Groupes</p>
              {data.subgroups.map(subgroup => (
                <Link key={subgroup._id} to={'/group/' + subgroup._id}>
                  <p>
                    {subgroup.name} : {subgroup.description}
                  </p>
                </Link>
              ))}
            </>
          )}

          {data.texts.length > 0 && (
            <>
              <p>Textes</p>
              {data.texts.map(text => (
                <Link key={text._id} to={'/text/' + text._id}>
                  <p>
                    {text.name} : {text.description}
                  </p>
                </Link>
              ))}
            </>
          )}
        </>
      )}
    </UserContext.Consumer>
  )
}
