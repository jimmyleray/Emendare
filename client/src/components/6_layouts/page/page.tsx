import React from 'react'
import { Title } from '../../../services'

interface IProps {
  children: React.ReactNode
  title: string
}

// Main Page component that also update document title
export const Page = (props: IProps) => {
  Title.pageTitle = props.title
  return <>{props.children}</>
}
