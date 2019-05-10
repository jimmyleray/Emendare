import React from 'react'
import { IText } from '../../../../../interfaces'
import { Button, Icon, ApiContext } from '../../../components'

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
}: IUnFollowTextProps) => {
  const { Socket } = React.useContext(ApiContext)

  return withIcon ? (
    <Button
      className="has-text-grey-light no-focus-outlined"
      style={{
        border: 'none',
        padding: '0',
        backgroundColor: 'transparent'
      }}
      onClick={() => {
        Socket.emit('unFollowText', { id: text._id })
      }}
    >
      <Icon
        type={'light'}
        name="fas fa-user"
        className={'fa-lg ' + className}
        style={{
          marginRight: '0.5rem',
          backgroundColor: 'hsl(204, 86%, 53%, 20%)',
          borderRadius: '50%',
          height: '2.3rem',
          width: '2.3rem'
        }}
      />
      <span className={className}>{text.followersCount}</span>
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
}
