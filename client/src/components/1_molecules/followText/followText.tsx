import React from 'react'
import { IText } from '../../../../../interfaces'
import { Button, Icon, ApiContext } from '../../../components'

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
}: IFollowTextProps) => {
  const { Socket } = React.useContext(ApiContext)

  return withIcon ? (
    <Button
      className="has-text-grey-light has-text-weight-semibold no-focus-outlined"
      style={{
        border: 'none',
        padding: '0',
        backgroundColor: 'transparent'
      }}
      onClick={() => {
        Socket.emit('followText', { id: text._id })
      }}
    >
      <Icon
        type={'light'}
        name="fa-user"
        className="fa-lg"
        style={{ marginRight: '0.5rem', height: '2.3rem', width: '2.3rem' }}
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
}
