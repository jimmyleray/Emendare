import React from 'react'
import { Link } from 'react-router-dom'
import { Markdown } from '../components'

export const Amend = ({ data }) => {
  return (
    <>
      <div className="buttons">
        {data.group && (
          <Link to={'/text/' + data._id} className="button">
            <span className="icon">
              <i className="fas fa-chevron-left" />
            </span>
            <span>Retour au texte</span>
          </Link>
        )}
      </div>

      <div className="box">
        <p>
          Paramètres | <strong>{data.group.name}</strong>
        </p>
        <p>Description : {'Règles du groupe ' + data.group.name}</p>
        <p>Crée le : {new Date(data.created).toLocaleString()}</p>
      </div>

      <Markdown>{data.actual}</Markdown>
    </>
  )
}
