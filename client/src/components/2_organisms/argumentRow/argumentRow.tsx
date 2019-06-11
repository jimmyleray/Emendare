import React from 'react'
// Components
import { useUser, Argument, ApiContext } from '../../../components'
// Interfaces
import { IArgument } from '../../../../../interfaces'
// Helpers
import { hasUserDownVote, hasUserUpVote } from '../../../helpers'

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
  const { user } = useUser()
  const { Socket } = React.useContext(ApiContext)

  const upVoteArgument = (argumentID: string, amendID: string) => {
    if (user) {
      hasUserUpVote(user.argumentUpVotes, amendID, data._id)
        ? Socket.emit('unVoteArgument', { amendID, argumentID })
        : Socket.emit('upVoteArgument', { amendID, argumentID })
    }
  }

  const downVoteArgument = (argumentID: string, amendID: string) => {
    if (user) {
      hasUserDownVote(user.argumentDownVotes, amendID, data._id)
        ? Socket.emit('unVoteArgument', { amendID, argumentID })
        : Socket.emit('downVoteArgument', { amendID, argumentID })
    }
  }

  return (
    <div style={{ marginTop: index !== 0 ? '1rem' : 0 }}>
      <Argument
        data={data}
        amendID={amendID}
        upVoteArgument={upVoteArgument}
        downVoteArgument={downVoteArgument}
        user={user}
      />
      <hr style={{ margin: 0 }} />
    </div>
  )
}
