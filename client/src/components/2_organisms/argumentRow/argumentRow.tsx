import React, { useContext } from 'react'
// Components
import { Media, StopWatch } from '../../../components'
// Interfaces
import { IArgument } from '../../../../../interfaces'
// Services
import { Socket } from '../../../services'

interface IEventRowProps {
  /** Following event */
  data: IArgument
  /** ID of the amend */
  amendID: string
  /** Index of the row */
  index: number
  measure: any
}

export const ArgumentRow = ({
  data,
  amendID,
  measure,
  index
}: IEventRowProps) => {
  const voteArgument = (argumentID: string, amendID: string) => {
    Socket.emit('upVoteArgument', { amendID, argumentID })
  }

  return (
    <div style={{ marginTop: index !== 0 ? '1rem' : 0 }}>
      <Media>
        <Media.Left>{data.upVotesCount}</Media.Left>
        <Media.Content>
          <div className="content">
            <p>
              <strong>
                {data.type === 'up' ? 'Argument pour' : 'Argument contre'}
              </strong>
              <br />
              {data.text}
              <br />
              <small>
                <a onClick={() => voteArgument(data._id, amendID)}>
                  Argument utile
                </a>{' '}
                . <StopWatch date={data.created} />
              </small>
            </p>
          </div>
        </Media.Content>
      </Media>
      <hr style={{ margin: 0 }} />
    </div>
  )
}
