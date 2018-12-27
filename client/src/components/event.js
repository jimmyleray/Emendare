import React from 'react'
import { Link } from 'react-router-dom'

export const Event = ({ data }) =>
  data.targetID ? (
    <>
      <Link to={'/amendement/' + data.targetID}>
        <div className="notification is-info is-size-5">{data.targetType}</div>
      </Link>
      <br />
    </>
  ) : (
    <div className="notification is-size-5">{data.targetType}</div>
  )
