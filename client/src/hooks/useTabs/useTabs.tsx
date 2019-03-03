/**
 * Hook for sharing tabs logic
 */
import React from 'react'

export const useTabs = (
  tabs: string[],
  initialIndex: number,
  infinite: boolean = true
): {
  selectedTab: string
  setSelectedTab: (tab: string) => void
  selectPreviousTab: () => void
  selectNextTab: () => void
} => {
  const [selectedTab, setSelectedTab] = React.useState(tabs[initialIndex])

  const selectNextTab = () => {
    const targetIndex = tabs.indexOf(selectedTab) + 1
    if (targetIndex > tabs.length - 1) {
      if (infinite) {
        setSelectedTab(tabs[0])
      }
    } else {
      setSelectedTab(tabs[targetIndex])
    }
  }

  const selectPreviousTab = () => {
    const targetIndex = tabs.indexOf(selectedTab) - 1
    if (targetIndex < 0) {
      if (infinite) {
        setSelectedTab(tabs[tabs.length - 1])
      }
    } else {
      setSelectedTab(tabs[targetIndex])
    }
  }

  return { selectedTab, setSelectedTab, selectPreviousTab, selectNextTab }
}
