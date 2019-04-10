import React from 'react'
import { IText } from '../../../../../interfaces'
import { Button, Icon } from '../../../components'
import { Socket } from '../../../services'

interface IUnFollowTextProps {
  /** Related Text */
  text: IText
  /** Additional CSS UI class */
  className?: string
  /** Display only an icon */
  withIcon?: boolean
}

export const UnFollowText = ({
  text,
  className = '',
  withIcon = false
}: IUnFollowTextProps) =>
  withIcon ? (
    <Button
      className="has-text-grey-light"
      style={{ border: 'none', padding: 'none' }}
      onClick={() => {
        Socket.emit('unFollowText', { id: text._id })
      }}
    >
      <Icon
        type={'light'}
        name="fas fa-user"
        className="fa-lg"
        style={{ marginRight: '0.5rem' }}
      />
      {text.followersCount}
    </Button>
  ) : (
    <Button
      onClick={() => {
        Socket.emit('unFollowText', { id: text._id })
      }}
      className={`button is-success is-outlined ${className}`}
    >
      Ne plus participer au texte
    </Button>
  )
