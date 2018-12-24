import React from 'react'

const textSizeDisplayed = 100

export const Amend = ({ data }) => (
  <div className="box">
    {data.name && <p className="has-text-centered is-size-5">{data.name}</p>}
    {data.description && <p>{data.description}</p>}
    {(data.name || data.description) && data.diffs && <hr />}
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
  </div>
)
