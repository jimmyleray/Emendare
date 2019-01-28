import React from 'react'

// Main Page component that also update document title
export const Page = ({ children, title }) => {
  document.title = title ? 'Emendare | ' + title : 'Emendare'

  return <>{children}</>
}
