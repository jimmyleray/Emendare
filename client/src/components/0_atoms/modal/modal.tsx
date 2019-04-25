import React from 'react'

interface IModalProps {
  /** Children nodes */
  children: React.ReactNode
  /** Additional css ui class */
  className?: string
  /** Style CSS */
  style?: React.CSSProperties
  /** Open the modal */
  isOpen?: boolean
}

export const Modal = ({
  children,
  className,
  isOpen = false,
  ...rest
}: IModalProps) => {
  return (
    <div
      className={`modal ${className} ${isOpen ? 'is-active' : ''}`}
      {...rest}
    >
      <div className="modal-background" {...rest} />
      {children}
    </div>
  )
}

const Content = ({ children, ...rest }: IModalProps) => (
  <div className="modal-content" {...rest}>
    {children}
  </div>
)

const Close = ({ children, ...rest }: IModalProps) => {
  return (
    <div className="modal-close" {...rest}>
      {children}
    </div>
  )
}

Modal.Content = Content
Modal.Close = Close
