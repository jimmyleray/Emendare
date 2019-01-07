import React from 'react'
import { Progress } from '../../components'

export const Results = ({ value }) =>
  !isNaN(value) ? (
    <>
      <div className="has-text-centered">
        {value > 0 && (
          <div
            className="has-text-weight-semibold"
            style={{
              display: 'inline-block',
              width: value + '%',
              minWidth: '100px',
              maxWidth: 'calc(100% - 100px)'
            }}
          >
            {value + '% POUR'}
          </div>
        )}

        {value < 100 && (
          <div
            className="has-text-weight-semibold"
            style={{
              display: 'inline-block',
              width: 100 - value + '%',
              minWidth: '100px',
              maxWidth: 'calc(100% - 100px)'
            }}
          >
            {(100 - value).toFixed(1) + '% CONTRE'}
          </div>
        )}
      </div>
      <div>
        <Progress
          className="is-success is-large"
          value="100"
          max="100"
          style={{
            display: 'inline-block',
            margin: 0,
            width: value + '%',
            borderTopRightRadius: value < 100 ? 0 : null,
            borderBottomRightRadius: value < 100 ? 0 : null
          }}
        />
        <Progress
          className="is-danger is-large"
          value="100"
          max="100"
          style={{
            margin: 0,
            display: 'inline-block',
            width: 100 - value + '%',
            borderTopLeftRadius: value > 0 ? 0 : null,
            borderBottomLeftRadius: value > 0 ? 0 : null
          }}
        />
      </div>
    </>
  ) : (
    <>
      <p className="has-text-centered has-text-weight-semibold">
        Il n'y a pas encore de résultats à afficher
      </p>
      <Progress
        className="is-light is-large"
        value="100"
        max="100"
        style={{
          margin: 0,
          display: 'inline-block',
          width: '100%'
        }}
      />
    </>
  )
