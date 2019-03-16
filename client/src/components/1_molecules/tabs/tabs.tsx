import React from 'react'
import { useTabs } from '../../../hooks'
import { getIndexDefaultTab } from './helper'
import { Link } from '../../../components'

interface ITabsProps {
  /** Children node */
  children: React.ReactNode
  /** Name of each tabs */
  tabsName: string[]
  /** location */
  location?: Location
  /** default tab */
  defaultTab?: string
}

interface ITabProps {
  /** Children node */
  children: React.ReactNode
  /** Link to its Content */
  to: string
}

interface ITabsMenuProps {
  /** Children node */
  children: React.ReactNode
  /** Additional CSS UI class */
  className?: string
}

interface ITabContentProps {
  /** Children node */
  children: React.ReactNode
  /** Link to its item */
  for: string
}

// Create context
const TabsContext = React.createContext<any>(null)

// Check if the component is in the context
const useTabsContext = () => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error('Component cannot be render outside the Tabs component')
  }
  return context
}

export const Tabs = ({
  children,
  tabsName,
  location,
  defaultTab
}: ITabsProps) => {
  const {
    selectedTab,
    setSelectedTab,
    selectNextTab,
    selectPreviousTab
  } = useTabs(tabsName, getIndexDefaultTab(tabsName)(defaultTab))

  React.useEffect(() => {
    if (location) {
      const url = new URLSearchParams(location.search)
      setSelectedTab(url.get('tab') || defaultTab || tabsName[0])
    }
  }, [location])

  React.useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        selectNextTab()
      } else if (event.key === 'ArrowLeft') {
        selectPreviousTab()
      }
    }

    document.addEventListener('keyup', eventHandler)
    return () => {
      document.removeEventListener('keyup', eventHandler)
    }
  })

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab } as any}>
      <React.Fragment>{children}</React.Fragment>
    </TabsContext.Provider>
  )
}

const Menu = React.memo(({ children, className }: ITabsMenuProps) => (
  <div className={`tabs ${className}`}>
    <ul>{children}</ul>
  </div>
))

const Tab = React.memo(({ children, to }: ITabProps) => {
  const { selectedTab, setSelectedTab } = useTabsContext()
  return (
    <li className={selectedTab === to ? 'is-active' : ''}>
      <Link onClick={() => setSelectedTab(to)}>{children}</Link>
    </li>
  )
})

const Content = React.memo((props: ITabContentProps) => {
  const { selectedTab } = useTabsContext()
  return selectedTab === props.for ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : null
})

Tabs.Menu = Menu
Tabs.Tab = Tab
Tabs.Content = Content
