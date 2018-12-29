import React from 'react'

export const Results = ({ value }) =>
  value ? (
    <>
      <div className="has-text-centered">
        <div
          className="has-text-success has-text-weight-semibold"
          style={{
            display: 'inline-block',
            width: value + '%',
            minWidth: '100px',
            maxWidth: 'calc(100% - 100px)'
          }}
        >
          {value + '% POUR'}
        </div>
        <div
          className="has-text-danger has-text-weight-semibold"
          style={{
            display: 'inline-block',
            width: 100 - value + '%',
            minWidth: '100px',
            maxWidth: 'calc(100% - 100px)'
          }}
        >
          {100 - value + '% CONTRE'}
        </div>
      </div>
      <div>
        <progress
          className="progress is-success is-large"
          value="100"
          max="100"
          style={{
            display: 'inline-block',
            margin: 0,
            width: value + '%',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          }}
        />
        <progress
          className="progress is-danger is-large"
          value="100"
          max="100"
          style={{
            display: 'inline-block',
            width: 100 - value + '%',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }}
        />
      </div>
    </>
  ) : (
    <p className="has-text-centered">
      Il n'y a pas encore de résultats de votes à afficher
    </p>
  )
