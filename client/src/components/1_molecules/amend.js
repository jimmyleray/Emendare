import React from 'react'
import { Box } from '../../components'

const textSizeDisplayed = 100

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
          <span
            key={index}
            className={
              part[0] === 1
                ? 'has-text-weight-bold has-text-success'
                : part[0] === -1
                ? 'has-text-weight-bold has-text-danger'
                : 'has-text-grey-light'
            }
          >
            {part[0] === 1 ? '(+)' : part[0] === -1 ? '[-]' : ''}
            {part[1].split('\n').map((line, index) => {
              return line ? (
                <span key={index}>
                  {line.length > textSizeDisplayed * 2
                    ? line.slice(0, textSizeDisplayed) +
                      ' (...) ' +
                      line.slice(-textSizeDisplayed, -1)
                    : line}
                </span>
              ) : (
                <br key={index} />
              )
            })}
            {part[0] === 1 ? '(+)' : part[0] === -1 ? '[-]' : ''}
          </span>
        ))}
    </div>
  </Box>
)
