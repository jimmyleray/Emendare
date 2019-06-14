import React from 'react'
// Components
import { Button, Icon, ApiContext } from '../../../components'
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
  const { Socket } = React.useContext(ApiContext)

  return withIcon ? (
    <Button
      className="has-text-grey-light"
      onClick={() => {
        Socket.emit('followText', { id: text.id })
      }}
      style={{
        border: 'none',
        padding: 'none',
        backgroundColor: 'transparent'
      }}
      to={path.edit(text.id)}
    >
      <Icon
        type={'light'}
        name="fa-pencil-alt"
        className="fa-lg"
        style={{ marginRight: '0.5rem' }}
      />
      {text.amends.length}
    </Button>
  ) : (
    <Button
      to={path.edit(text.id)}
      className={`is-info ${className}`}
      onClick={() => {
        Socket.emit('followText', { id: text.id })
      }}
    >
      <Icon type={'solid'} name="fa-plus" />
      <span>Proposer un amendement</span>
    </Button>
  )
}
