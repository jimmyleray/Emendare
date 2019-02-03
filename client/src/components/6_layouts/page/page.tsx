import React from 'react'
import { Title } from '../../../services'

// Main Page component that also update document title
export const Page = ({
  children,
  title
}: {
  children: React.ReactNode
  title: string
}) => {
  Title.pageTitle = title
  return <>{children}</>
}
