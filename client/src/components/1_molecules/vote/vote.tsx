import React from 'react'
import { Socket } from '../../../services'
// Components
import { Icon, Button, Buttons, I18nContext } from '../../../components'
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

const vote = (user: any) => (amend: any) => (type: string) => (
  id: string
) => async () => {
  const textID = amend.text
  if (user.followedTexts.indexOf(textID) === -1) {
    await Socket.fetch('followText', { id: textID })
  }

  await Socket.fetch(type + 'VoteAmend', { id })
  Socket.emit('user')
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

  const isVoteInAmend = React.useMemo(
    () => (votes: string[], amendId: string) => votes.includes(amendId),
    [user]
  )

  const propsVoteUp = React.useMemo(
    () => getPropsAmendUp(isVoteInAmend(user.upVotes, amend._id)),
    [user.upVotes, amend._id]
  )

  const propsVoteDown = React.useMemo(
    () => getPropsAmendDown(isVoteInAmend(user.downVotes, amend._id)),
    [user.downVotes, amend._id]
  )

  return withIcon ? (
    <div style={{ display: 'flex', ...style }}>
      <div>
        <Button
          {...propsVoteUp.container}
          onClick={vote(user)(amend)('up')(match.params.id)}
        >
          <Icon {...propsVoteUp.icon} />
          <span>{amend.results.upVotesCount}</span>
        </Button>
      </div>
      <div>
        <Button
          {...propsVoteDown.container}
          onClick={vote(user)(amend)('down')(match.params.id)}
        >
          <Icon {...propsVoteDown.icon} />
          <span>{amend.results.downVotesCount}</span>
        </Button>
      </div>
    </div>
  ) : (
    <Buttons className={className} {...rest}>
      <Button
        className={`is-success ${className} ${
          isVoteInAmend(user.upVotes, amend._id) ? '' : 'is-outlined'
        }`}
        onClick={vote(user)(amend)('up')(match.params.id)}
        disabled={amend.closed}
      >
        <span>{translate('UP_VOTE')}</span>
        <Icon type={'solid'} name="fa-smile" size="fa-lg" />
      </Button>

      <Button
        className={`is-info ${className} ${
          isVoteInAmend(user.indVotes, amend._id) ? '' : 'is-outlined'
        }`}
        onClick={vote(user)(amend)('ind')(match.params.id)}
        disabled={amend.closed}
      >
        <span>{translate('IND_VOTE')}</span>
        <Icon type={'solid'} name="fa-meh" size="fa-lg" />
      </Button>

      <Button
        className={`is-danger ${className} ${
          isVoteInAmend(user.downVotes, amend._id) ? '' : 'is-outlined'
        }`}
        onClick={vote(user)(amend)('down')(match.params.id)}
        disabled={amend.closed}
      >
        <span>{translate('DOWN_VOTE')}</span>
        <Icon type={'solid'} name="fa-frown" size="fa-lg" />
      </Button>
    </Buttons>
  )
}
