import React from 'react'
import { Socket } from '../../../services'
import { Icon, Button, Buttons, I18nContext, Column } from '../../../components'
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
    <React.Fragment>
      <div>
        <Button
          className="has-text-link no-focus-outlined"
          style={{
            border: 'none',
            padding: 'none',
            backgroundColor: 'transparent'
          }}
          onClick={vote(user)(amend)('up')(match.params.id)}
          disabled={amend.closed}
        >
          <Icon
            type={'solid'}
            name={`fa-thumbs-up`}
            className={`${
              isVoteInAmend(user.upVotes, amend._id) ? 'has-text-link' : ''
            } fa-lg`}
            style={{
              marginRight: '0.5rem',
              background: 'hsl(217, 71%, 53%, 20%)',
              borderRadius: '50%',
              height: '2.3rem',
              width: '2.3rem',
              border: isVoteInAmend(user.upVotes, amend._id)
                ? '1px solid hsl(217, 71%, 53%)'
                : 'none'
            }}
          />
          <span
            className={`${
              isVoteInAmend(user.upVotes, amend._id) ? 'has-text-link' : ''
            }`}
          >
            {amend.results.upVotesCount}
          </span>
        </Button>
      </div>
      <div style={{ marginLeft: '1.5rem' }}>
        <Button
          className="has-text-danger no-focus-outlined"
          style={{
            border: 'none',
            padding: 'none',
            backgroundColor: 'transparent'
          }}
          onClick={vote(user)(amend)('down')(match.params.id)}
          disabled={amend.closed}
        >
          <Icon
            type={'solid'}
            name="fa-thumbs-down"
            className={`is-medium ${
              isVoteInAmend(user.downVotes, amend._id) ? 'has-text-danger' : ''
            } fa-lg`}
            style={{
              marginRight: '0.5rem',
              background: 'hsl(348, 100%, 61%, 20%)',
              borderRadius: '50%',
              height: '2.3rem',
              width: '2.3rem',
              border: isVoteInAmend(user.downVotes, amend._id)
                ? '1px solid hsl(348, 100%, 61%)'
                : 'none'
            }}
          />
          <span
            className={`${
              isVoteInAmend(user.downVotes, amend._id) ? 'has-text-danger' : ''
            }`}
          >
            {amend.results.downVotesCount}
          </span>
        </Button>
      </div>
    </React.Fragment>
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
