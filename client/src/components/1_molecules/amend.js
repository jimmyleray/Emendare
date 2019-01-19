import React from 'react'
import { Box } from '../../components'

export const Amend = ({ data }) => (
  <Box>
    <p className="has-text-centered is-size-5">
      Amendement sur : {data.text.name}
    </p>
    <p className="has-text-centered is-size-5 has-text-weight-bold">
      {data.name}
    </p>
    <br />
    <p>{data.description}</p>
    <hr />
    <div>
      {data.diffs &&
        data.diffs.map((part, index) => (
          <p
            key={index}
            className={
              part.added
                ? 'has-text-weight-bold has-text-success'
                : part.removed
                ? 'has-text-weight-bold has-text-danger'
                : 'has-text-grey-light'
            }
          >
            {part.count > 1
              ? part.value.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))
              : part.value}
          </p>
        ))}
    </div>
  </Box>
)
