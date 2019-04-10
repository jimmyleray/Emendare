import React from 'react'
import { IText } from '../../../../../interfaces'
import { Button, Icon } from '../../../components'
import { Socket } from '../../../services'

interface IFollowTextProps {
  /** Related Text */
  text: IText
  /** Additional CSS UI class */
  className?: string
  /** Display only an icon */
  withIcon?: boolean
}

export const FollowText = ({
  text,
  className = '',
  withIcon = false
}: IFollowTextProps) =>
  withIcon ? (
    <Button
      className="has-text-grey-light"
      style={{ border: 'none', padding: 'none' }}
      onClick={() => {
        Socket.emit('followText', { id: text._id })
      }}
    >
      <Icon
        type={'light'}
        name="fa-user"
        className="fa-lg"
        style={{ marginRight: '0.5rem' }}
      />
      {text.followersCount}
    </Button>
  ) : (
    <Button
      onClick={() => {
        Socket.emit('followText', { id: text._id })
      }}
      className={`button is-success ${className}`}
    >
      Participer à ce texte
    </Button>
  )
