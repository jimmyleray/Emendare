import React from 'react'
import { Title } from '../../../services'

interface IProps {
  children: React.ReactNode
  title: string
}

// Main Page component that also update document title
export const Page = ({ children, title }: IProps) => {
  React.useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0)
    }
  }, [])

  React.useEffect(() => {
    Title.pageTitle = title
  }, [title])

  return <React.Fragment>{children}</React.Fragment>
}
