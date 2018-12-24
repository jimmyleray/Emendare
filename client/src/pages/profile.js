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
        <>
          <p>Profil de {user.email}</p>
          <p>Crée le {new Date(user.created).toLocaleString()}</p>
          {user.amends.length > 0 && (
            <div className="box">
              <p>Liste des amendements proposés</p>
              {user.amends.map(amend => (
                <Link key={amend._id} to={'/amendement/' + amend._id}>
                  {amend.name} : {amend.description}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </UserContext.Consumer>
  </Page>
)
