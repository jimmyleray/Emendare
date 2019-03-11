/**
 * Return the default active tab index
 * @param tabs Array of tabs name
 */
export const getIndexDefaultTab = (tabs: string[]) => (defaultTab: any) => {
  if (defaultTab) {
    const indexDefaultTab = tabs.indexOf(defaultTab)
    return indexDefaultTab !== -1 ? indexDefaultTab : 0
  }
  return 0
}
