import React from 'react'
// Interfaces
import { IText } from '../../../../../interfaces'
// Components
import { Button } from '../..'
// Services
import { Socket } from '../../../services'

interface IUnFollowTextProps {
  /** Related Text */
  text: IText
  /** Additional CSS UI class */
  className?: string
}

export const UnFollowText = ({ text, className }: IUnFollowTextProps) => (
  <Button
    onClick={() => {
      Socket.emit('unFollowText', { id: text._id })
    }}
    className={`button is-success is-outlined ${className}`}
  >
    Ne plus participer au texte
  </Button>
)
