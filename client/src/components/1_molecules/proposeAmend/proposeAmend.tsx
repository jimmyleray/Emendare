import React from 'react'
// Services
import { Socket } from '../../../services'
// Components
import { Button, Icon } from '../../../components'
import { IText } from '../../../../../interfaces'
import { path } from '../../../config'

interface IProposeAmendProps {
  /** Related text */
  text: IText
  /** Additional CSS UI class */
  className?: string
  /** Display only an icon */
  withIcon?: boolean
}

export const ProposeAmend = ({
  text,
  className,
  withIcon = false
}: IProposeAmendProps) => {
  return withIcon ? (
    <Button
      className="has-text-grey-light"
      onClick={() => {
        Socket.emit('followText', { id: text._id })
      }}
      style={{ border: 'none', padding: 'none' }}
      to={path.edit(text._id)}
    >
      <Icon
        type={'light'}
        name="fa-comments"
        className="fa-lg"
        style={{ marginRight: '0.5rem' }}
      />
      {text.amends.length}
    </Button>
  ) : (
    <Button
      to={path.edit(text._id)}
      className={`is-info ${className}`}
      onClick={() => {
        Socket.emit('followText', { id: text._id })
      }}
    >
      <Icon type={'solid'} name="fa-plus" />
      <span>Proposer un amendement</span>
    </Button>
  )
}
