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
}
const isOutlined = 'is-outlined'

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
  ...rest
}: IVoteProps) => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Buttons className={className} {...rest}>
      <Button
        className={`is-success ${
          user.upVotes.includes(amend._id) ? '' : 'is-outlined'
        }`}
        onClick={vote(user)(amend)('up')(match.params.id)}
        disabled={amend.closed}
      >
        <span>{translate('UP_VOTE')}</span>
        <Icon type="fas fa-smile fa-lg" />
      </Button>
      <Button
        className={`is-info ${
          user.indVotes.includes(amend._id) ? '' : 'is-outlined'
        }`}
        onClick={vote(user)(amend)('ind')(match.params.id)}
        disabled={amend.closed}
      >
        <span>{translate('IND_VOTE')}</span>
        <Icon type="fas fa-meh fa-lg" />
      </Button>
      <Button
        className={`is-danger ${
          user.downVotes.includes(amend._id) ? '' : 'is-outlined'
        }`}
        onClick={vote(user)(amend)('down')(match.params.id)}
        disabled={amend.closed}
      >
        <span>{translate('DOWN_VOTE')}</span>
        <Icon type="fas fa-frown fa-lg" />
      </Button>
    </Buttons>
  )
}
