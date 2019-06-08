import React, { useMemo } from 'react'
import { useToggle } from '../../../hooks'
import { callAll } from '../../../helpers'

interface ICollapseProps {
  /** Children nodes */
  children: any
  /** set toggle state */
  isOpen?: boolean
  /** style CSS */
  style?: React.CSSProperties
  /** Additionnal CSS UI class  */
  className?: string
  /** on click event */
  onClick?: any
}

// Context
const CollapseContext = React.createContext({
  on: false,
  toggler: () => {
    return
  }
})

const useCollapseContext = () => {
  const context = React.useContext(CollapseContext)
  if (!context) {
    throw new Error('Component cannot be render outside the Collapse component')
  }
  return context
}

export const Collapse = ({
  children,
  isOpen = false,
  ...rest
}: ICollapseProps) => {
  const { on, toggler } = useToggle(isOpen)
  const value = useMemo(() => ({ toggler, on }), [toggler, on])
  return (
    <CollapseContext.Provider value={value} {...rest}>
      {children}
    </CollapseContext.Provider>
  )
}

const Trigger = ({ children, onClick, ...rest }: ICollapseProps) => {
  const { toggler, on } = useCollapseContext()
  return (
    <div
      onClick={(event: React.MouseEvent) => {
        event.stopPropagation()
        onClick ? callAll(toggler, onClick)() : toggler()
      }}
      {...rest}
    >
      {children(on)}
    </div>
  )
}

const Detail = ({ children }: any) => {
  const { on } = useCollapseContext()
  return on ? <React.Fragment>{children}</React.Fragment> : null
}

Collapse.Trigger = Trigger
Collapse.Detail = Detail
