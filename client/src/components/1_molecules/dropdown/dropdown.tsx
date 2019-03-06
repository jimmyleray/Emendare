import React, { useState } from 'react'
import { Button } from '../../../components'

interface IItemProps {
  /** Children node */
  children: React.ReactNode
}

interface ITriggerProps {
  /** Title of the button */
  title: string
  /** Additional CSS UI class */
  className?: string
  /** Icon of the button */
  icon?: string
}

interface IDropDownProps {
  /** Children node */
  children: React.ReactNode
  /** navbar mode */
  navbar?: boolean
  /** Additional CSS UI class */
  className?: string
}

interface IMenuProps {
  /** Children node */
  children: React.ReactNode
}

// Context
const DropDownContext = React.createContext({
  open: false,
  drop: () => {
    return
  },
  navbar: false
})
const useDropDownContext = () => {
  const context = React.useContext(DropDownContext)
  if (!context) {
    throw new Error('Component cannot be render outside the DropDown component')
  }
  return context
}

export const DropDown = ({
  children,
  className,
  navbar = false,
  ...rest
}: IDropDownProps) => {
  const [open, setOpen] = useState(false)
  const drop = React.useCallback(() => setOpen(oldOpen => !oldOpen), [])

  const value = React.useMemo(() => ({ open, drop, navbar }), [open])

  return (
    <DropDownContext.Provider value={value}>
      <div
        className={`${navbar ? 'has-dropdown' : 'dropdown'} ${
          open ? 'is-active' : ''
        } ${className}`}
        {...rest}
      >
        {children}
      </div>
    </DropDownContext.Provider>
  )
}

const Menu = ({ children }: IMenuProps) => {
  const { navbar } = useDropDownContext()
  return (
    <div
      className={`${navbar ? 'navbar-dropdown' : 'dropdown-menu'}`}
      id="dropdown-menu"
      role="menu"
    >
      {navbar ? children : <div className="dropdown-content">{children}</div>}
    </div>
  )
}

const Item = ({ children }: IItemProps) => {
  const { drop, navbar } = useDropDownContext()
  return navbar ? (
    <div onClick={drop}>{children}</div>
  ) : (
    <div className="dropdown-item" onClick={drop}>
      {children}
    </div>
  )
}

const Divider = () => {
  const { navbar } = useDropDownContext()
  return <hr className={`${navbar ? 'navbar-divider' : 'dropdown-divider'}`} />
}

const Trigger = ({ title, icon }: ITriggerProps) => {
  const { drop, navbar } = useDropDownContext()
  return navbar ? (
    <a className="navbar-link" onClick={drop}>
      {title}
    </a>
  ) : (
    <div className="dropdown-trigger">
      <Button onClick={drop}>
        <span>{title}</span>
        <span className="icon">
          <i
            className={`fas ${icon ? icon : 'fa-angle-down'}`}
            aria-hidden="true"
          />
        </span>
      </Button>
    </div>
  )
}

DropDown.Item = Item
DropDown.Divider = Divider
DropDown.Trigger = Trigger
DropDown.Menu = Menu
