import React from 'react'
import { Socket } from '../../../services'
import { Icon, Button, Buttons, I18nContext } from '../../../components'
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
  /** Display the result next to each button */
  withResult?: boolean
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
  withText = true,
  withResult = false,
  ...rest
}: IVoteProps) => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Buttons className={className} {...rest}>
      {withResult && (
        <span
          className="has-text-success is-size-5"
          style={{ marginRight: '0.5em' }}
        >
          {amend.results.upVotesCount}{' '}
        </span>
      )}
      <Button
        className={`is-success ${className} ${
          user.upVotes.includes(amend._id) ? '' : 'is-outlined'
        }`}
        onClick={vote(user)(amend)('up')(match.params.id)}
        disabled={amend.closed}
      >
        {withText && <span>{translate('UP_VOTE')}</span>}
        <Icon type={'solid'} name="fa-smile" size="fa-lg" />
      </Button>
      {withResult && (
        <span
          className="has-text-info is-size-5"
          style={{ marginRight: '0.5em' }}
        >
          {amend.results.indVotesCount}{' '}
        </span>
      )}
      <Button
        className={`is-info ${className} ${
          user.indVotes.includes(amend._id) ? '' : 'is-outlined'
        }`}
        onClick={vote(user)(amend)('ind')(match.params.id)}
        disabled={amend.closed}
      >
        {withText && <span>{translate('IND_VOTE')}</span>}
        <Icon type={'solid'} name="fa-meh" size="fa-lg" />
      </Button>
      {withResult && (
        <span
          className="has-text-danger is-size-5"
          style={{ marginRight: '0.5em' }}
        >
          {amend.results.downVotesCount}{' '}
        </span>
      )}
      <Button
        className={`is-danger ${className} ${
          user.downVotes.includes(amend._id) ? '' : 'is-outlined'
        }`}
        onClick={vote(user)(amend)('down')(match.params.id)}
        disabled={amend.closed}
      >
        {withText && <span>{translate('DOWN_VOTE')}</span>}
        <Icon type={'solid'} name="fa-frown" size="fa-lg" />
      </Button>
    </Buttons>
  )
}
