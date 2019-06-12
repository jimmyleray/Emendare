import React from 'react'
// Components
import {
  Icon,
  Button,
  Buttons,
  I18nContext,
  ApiContext
} from '../../../components'
// Interfaces
import { IAmend } from '../../../../../interfaces'
// Helper
import { getPropsAmendDown, getPropsAmendUp } from '../../../helpers'

interface IVoteProps {
  /** User data */
  user: any
  /** Amend data */
  amend: IAmend
  /** match  */
  match: any
  /** Additional CSS UI class */
  className?: string
  /** Custom CSS */
  style?: React.CSSProperties
  /** Display the text+Icon or just icon */
  withText?: boolean
  /** Display just icons and result */
  withIcon?: boolean
}

export const Vote = ({
  className,
  user,
  amend,
  style,
  match,
  withIcon = false,
  ...rest
}: IVoteProps) => {
  const { translate } = React.useContext(I18nContext)
  const { Socket } = React.useContext(ApiContext)

  const vote = (user: any) => (amend: any) => (type: string) => (
    id: string
  ) => async (event: any) => {
    event.stopPropagation()
    const textID = amend.text
    if (user.followedTexts.indexOf(textID) === -1) {
      await Socket.fetch('followText', { id: textID })
    }

    await Socket.fetch(type + 'VoteAmend', { id })
    Socket.emit('user')
  }

  const isVoteInAmend = (votes: string[], amendId: string) =>
    votes.includes(amendId)

  const propsVoteUp = getPropsAmendUp(
    user ? isVoteInAmend(user.upVotes, amend.id) : false
  )

  const propsVoteDown = getPropsAmendDown(
    user ? isVoteInAmend(user.downVotes, amend.id) : false
  )

  return withIcon ? (
    <div style={{ display: 'flex', ...style }}>
      <div>
        <Button
          {...propsVoteUp.container}
          disabled={!user}
          onClick={user && vote(user)(amend)('up')(match.params.id)}
        >
          <Icon
            {...propsVoteUp.icon}
            styleIcon={{ top: '-5%', position: 'relative' }}
          />
          <span className="has-text-weight-semibold">
            {amend.results.upVotesCount}
          </span>
        </Button>
      </div>
      <div>
        <Button
          {...propsVoteDown.container}
          disabled={!user}
          onClick={user && vote(user)(amend)('down')(match.params.id)}
        >
          <Icon
            {...propsVoteDown.icon}
            styleIcon={{ top: '5%', position: 'relative' }}
          />
          <span className="has-text-weight-semibold">
            {amend.results.downVotesCount}
          </span>
        </Button>
      </div>
    </div>
  ) : (
    <Buttons className={className} {...rest}>
      <Button
        className={`is-success ${className} ${
          isVoteInAmend(user.upVotes, amend.id) ? '' : 'is-outlined'
        }`}
        onClick={user && vote(user)(amend)('up')(match.params.id)}
        disabled={!user || amend.closed}
      >
        <span>{translate('UP_VOTE')}</span>
        <Icon type={'solid'} name="fa-smile" size="fa-lg" />
      </Button>

      <Button
        className={`is-info ${className} ${
          isVoteInAmend(user.indVotes, amend.id) ? '' : 'is-outlined'
        }`}
        onClick={user && vote(user)(amend)('ind')(match.params.id)}
        disabled={!user || amend.closed}
      >
        <span>{translate('IND_VOTE')}</span>
        <Icon type={'solid'} name="fa-meh" size="fa-lg" />
      </Button>

      <Button
        className={`is-danger ${className} ${
          isVoteInAmend(user.downVotes, amend.id) ? '' : 'is-outlined'
        }`}
        onClick={user && vote(user)(amend)('down')(match.params.id)}
        disabled={!user || amend.closed}
      >
        <span>{translate('DOWN_VOTE')}</span>
        <Icon type={'solid'} name="fa-frown" size="fa-lg" />
      </Button>
    </Buttons>
  )
}
