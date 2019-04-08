import React from 'react'
import { IText } from '../../../../../interfaces'
import { Button } from '../../../components'
import { Socket } from '../../../services'

interface IFollowTextProps {
  /** Related Text */
  text: IText
  /** Additional CSS UI class */
  className?: string
}

export const FollowText = ({ text, className = '' }: IFollowTextProps) => (
  <Button
    onClick={() => {
      Socket.emit('followText', { id: text._id })
    }}
    className={`button is-success ${className}`}
  >
    Participer à ce texte
  </Button>
)
