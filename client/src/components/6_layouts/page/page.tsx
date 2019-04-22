import React from 'react'
import { Card } from '../../../components'
import { Title } from '../../../services'

interface IProps {
  children: React.ReactNode
  title: string
  style?: React.CSSProperties
}

// Main Page component that also update document title
export const Page = ({
  children,
  title,
  style = { padding: '2rem' }
}: IProps) => {
  React.useEffect(() => {
    if (window.scrollY) {
      window.scroll(0, 0)
    }
  }, [])

  React.useEffect(() => {
    Title.pageTitle = title
  }, [title])

  return <Card style={style}>{children}</Card>
}
