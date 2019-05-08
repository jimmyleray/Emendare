import React, { useContext, useState } from 'react'

interface IModalProps {
  /** Children nodes */
  children: any
  /** Additional css ui class */
  className?: string
  /** Style CSS */
  style?: React.CSSProperties
  /** Open the modal */
  isOpen?: boolean
  active?: boolean
}

const ModalContext = React.createContext<any>({})

const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Should be inside the Modal comoponent')
  }
  return context
}

export const ModalContainer = ({ children }: IModalProps) => {
  const [on, set] = useState(false)
  const toggler = () => set(!on)

  return (
    <ModalContext.Provider value={{ on, set, toggler }}>
      {children}
    </ModalContext.Provider>
  )
}

const Modal = ({ children, className = '', ...rest }: IModalProps) => {
  const { on } = useModalContext()
  return (
    <div className={`modal ${className} ${on ? 'is-active' : ''}`} {...rest}>
      <Close>
        <div className="modal-background" />
      </Close>
      {children}
    </div>
  )
}

const Content = ({ children, ...rest }: IModalProps) => (
  <div
    className="modal-content"
    onClick={event => {
      event.stopPropagation()
    }}
    style={{ cursor: 'auto' }}
    {...rest}
  >
    {children}
  </div>
)

const Trigger = ({ children, active = true, ...rest }: IModalProps) => {
  const { toggler } = useModalContext()
  return (
    <div
      {...rest}
      onClick={event => {
        event.stopPropagation()
        if (active) {
          toggler()
        }
      }}
      style={{ cursor: active ? 'pointer' : 'auto' }}
    >
      {children}
    </div>
  )
}

const Close = ({ children, active = true, ...rest }: IModalProps) => {
  const { set } = useModalContext()
  return (
    <div
      onClick={event => {
        event.stopPropagation()
        if (active) {
          set(false)
        }
      }}
      style={{ cursor: active ? 'pointer' : 'auto' }}
      {...rest}
    >
      {children}
    </div>
  )
}

ModalContainer.Modal = Modal

Modal.Content = Content
Modal.Close = Close
Modal.Trigger = Trigger
