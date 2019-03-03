import React from 'react'
import { Focus, Title } from '../../../services'

interface IProps {
  children: React.ReactNode
  title: string
}

// Main Page component that also update document title
export const Page = (props: IProps) => {
  Title.pageTitle = props.title

  React.useEffect(() => {
    Focus.setMain()
  })

  return <React.Fragment>{props.children}</React.Fragment>
}
