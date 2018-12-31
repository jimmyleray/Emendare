/*
 * Page de profil
 * Le but de cette page est de permettre aux utilisateurs :
 * - TODO : de visualiser les informations liées à son compte
 * - TODO : de supprimer leur compte et leurs données
 * - TODO : de changer d'email
 * - TODO : de changer de mot de passe
 * - de visualiser l'ensemble des contenus suivis
 * - TODO : de paramétrer les détails de son compte
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Column, Columns, Page, UserContext } from '../../components'
import { path } from '../../config'

export const ProfilePage = () => (
  <Page title="Profil">
    <UserContext.Consumer>
      {({ user }) => (
        <>
          <div className="field has-text-centered">
            <h1 className="is-size-3">Mon profil</h1>
            <h2 className="is-size-5">{user.email}</h2>
          </div>
          <br />
          <Columns>
            <Column>
              {user.followedTexts.length > 0 && (
                <Box>
                  <p>Liste des textes auxquels vous participez</p>
                  <ul>
                    {user.followedTexts.map(followedText => (
                      <li key={followedText._id}>
                        <Link to={path.text(followedText._id)}>
                          {followedText.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}

              {user.followedGroups.length > 0 && (
                <Box>
                  <p>Liste des groupes que vous avez rejoint</p>
                  <ul>
                    {user.followedGroups.map(followedGroup => (
                      <li key={followedGroup._id}>
                        <Link to={path.group(followedGroup._id)}>
                          {followedGroup.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Column>

            <Column>
              {user.amends.length > 0 && (
                <Box>
                  <p>Liste des amendements que vous avez proposés</p>
                  <ul>
                    {user.amends.map(amend => (
                      <li key={amend._id}>
                        <Link to={path.amend(amend._id)}>{amend.name}</Link>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Column>
          </Columns>
        </>
      )}
    </UserContext.Consumer>
  </Page>
)
