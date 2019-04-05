import React from 'react'
// Services
import { Socket } from '../../../services'
// Components
import { Buttons, Button, Icon } from '../../../components'
import { IText } from '../../../../../interfaces'
import { path } from '../../../config'

interface IProposeAmendProps {
  /** Related text */
  text: IText
  /** Additional CSS UI class */
  className?: string
}

export const ProposeAmend = ({ text, className }: IProposeAmendProps) => {
  return (
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
