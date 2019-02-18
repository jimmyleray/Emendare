import React from 'react'
import { Redirect } from 'react-router-dom'
import { path } from '../../../config'

interface IProps {
  children: React.ReactNode
}

interface IState {
  search: string
  redirectTo: boolean
  setSearch: (value: string) => void
}

export const SearchContext = React.createContext({} as IState)

export class SearchProvider extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      search: '',
      redirectTo: false,
      setSearch: (value: string) => {
        if (value !== this.state.search) {
          this.setState({ search: value, redirectTo: true })
        }
      }
    }
  }

  public render() {
    if (this.state.redirectTo) {
      this.setState({ redirectTo: false })
      return <Redirect to={path.home} />
    }

    return (
      <SearchContext.Provider value={this.state}>
        {this.props.children}
      </SearchContext.Provider>
    )
  }
}
