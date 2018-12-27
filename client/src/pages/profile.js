/*
 * Page de profil
 * Le but de cette page est de permettre aux utilisateurs :
 * - TODO : de visualiser les informations liées à son compte
 * - TODO : de supprimer leur compte et leurs données
 * - TODO : de changer d'email
 * - TODO : de changer de mot de passe
 * - TODO : de visualiser l'ensemble des contenus suivis
 * - TODO : de paramétrer les détails de son compte
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Page } from '../layouts'
import { UserContext } from '../contexts'

export const ProfilePage = () => (
  <Page title="Profil">
    <UserContext.Consumer>
      {({ user }) => (
        <div className="columns">
          <div className="column">
            <div className="box">
              <p>Profil de {user.email}</p>
              <p>Crée le {new Date(user.created).toLocaleString()}</p>
            </div>
          </div>

          <div className="column">
            {user.amends.length > 0 && (
              <div className="box">
                <p>Liste des amendements proposés</p>
                <ul>
                  {user.amends.map(amend => (
                    <li key={amend._id}>
                      <Link to={'/amendement/' + amend._id}>{amend.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {user.followedTexts.length > 0 && (
              <div className="box">
                <p>Liste des textes suivis</p>
                <ul>
                  {user.followedTexts.map(followedText => (
                    <li key={followedText._id}>
                      <Link to={'/texte/' + followedText._id}>
                        {followedText.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {user.followedGroups.length > 0 && (
              <div className="box">
                <p>Liste des groupes suivis</p>
                <ul>
                  {user.followedGroups.map(followedGroup => (
                    <li key={followedGroup._id}>
                      <Link to={'/groupe/' + followedGroup._id}>
                        {followedGroup.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </UserContext.Consumer>
  </Page>
)
