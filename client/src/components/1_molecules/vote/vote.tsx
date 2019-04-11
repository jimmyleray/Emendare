import React from 'react'
import { Socket } from '../../../services'
import {
  Icon,
  Button,
  Buttons,
  I18nContext,
  Column,
  Columns
} from '../../../components'
import { IAmend } from '../../../../../interfaces'

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
  match,
  withIcon = false,
  ...rest
}: IVoteProps) => {
  const { translate } = React.useContext(I18nContext)

  const isVoteInAmend = React.useMemo(
    () => (votes: string[], amendId: string) => votes.includes(amendId),
    [user]
  )

  return withIcon ? (
    <Columns className="is-mobile">
      <Column className="is-one-third">
        <Button
          className="has-text-grey-light"
          style={{ border: 'none', padding: 'none' }}
          onClick={vote(user)(amend)('up')(match.params.id)}
          disabled={amend.closed}
        >
          <Icon
            type={'light'}
            name={`${
              isVoteInAmend(user.upVotes, amend._id) ? 'fas' : ''
            } fa-thumbs-up`}
            className={`${
              isVoteInAmend(user.upVotes, amend._id) ? 'has-text-success' : ''
            } fa-lg`}
            style={{ marginRight: '0.5rem' }}
          />
          <span
            className={`${
              isVoteInAmend(user.upVotes, amend._id) ? 'has-text-success' : ''
            }`}
          >
            {amend.results.upVotesCount}
          </span>
        </Button>
      </Column>
      <Column className="is-one-third">
        <Button
          className="has-text-grey-light"
          style={{ border: 'none', padding: 'none' }}
          onClick={vote(user)(amend)('down')(match.params.id)}
          disabled={amend.closed}
        >
          <Icon
            type={'light'}
            name={`${
              isVoteInAmend(user.downVotes, amend._id) ? 'fas' : ''
            } fa-thumbs-down`}
            className={`${
              isVoteInAmend(user.downVotes, amend._id) ? 'has-text-danger' : ''
            } fa-lg`}
            style={{ marginRight: '0.5rem' }}
          />
          <span
            className={`${
              isVoteInAmend(user.downVotes, amend._id) ? 'has-text-danger' : ''
            }`}
          >
            {amend.results.downVotesCount}
          </span>
        </Button>
      </Column>
    </Columns>
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
