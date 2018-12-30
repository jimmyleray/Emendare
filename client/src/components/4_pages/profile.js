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
        <Columns>
          <Column>
            <Box>
              <p>Profil de {user.email}</p>
              <p>Crée le {new Date(user.created).toLocaleString()}</p>
            </Box>
          </Column>

          <Column>
            {user.amends.length > 0 && (
              <Box>
                <p>Liste des amendements proposés</p>
                <ul>
                  {user.amends.map(amend => (
                    <li key={amend._id}>
                      <Link to={path.amend(amend._id)}>{amend.name}</Link>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {user.followedTexts.length > 0 && (
              <Box>
                <p>Liste des textes suivis</p>
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
                <p>Liste des groupes suivis</p>
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
        </Columns>
      )}
    </UserContext.Consumer>
  </Page>
)
