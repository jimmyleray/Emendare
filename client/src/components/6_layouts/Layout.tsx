import React from 'react'
import { Header, NotificationAlert, Sidebar } from '../../components'

interface ILayoutProps {
  children: React.ReactNode
}

interface ILayoutState {
  displaySidebarOnMobile: boolean
}

// Main Application layout
export class Layout extends React.Component<ILayoutProps, ILayoutState> {
  private setSidebarDisplay: any

  constructor(props: ILayoutProps) {
    super(props)

    this.setSidebarDisplay = (displaySidebarOnMobile: boolean) => {
      this.setState({
        displaySidebarOnMobile
      })
    }

    this.state = {
      displaySidebarOnMobile: false
    }
  }

  public render() {
    return (
      <div className="is-flex" style={{ flexDirection: 'column' }}>
        <NotificationAlert />
        <div
          className="is-flex"
          style={{ flex: '1', flexDirection: 'row', height: '100vh' }}
        >
          <Sidebar
            className={
              this.state.displaySidebarOnMobile ? '' : 'is-hidden-mobile'
            }
            style={{
              flex: 'none',
              width: '250px',
              maxHeight: '100vh',
              marginBottom: 0
            }}
          />
          <div
            className="is-flex"
            style={{
              flex: '1',
              flexDirection: 'column',
              width: '100%',
              height: '100vh'
            }}
          >
            <Header
              setSidebarDisplay={this.setSidebarDisplay}
              sidebarDisplayed={this.state.displaySidebarOnMobile}
            />
            <main
              style={{
                flex: 1,
                padding: '1.5rem',
                minHeight: 'calc(100vh - 70px)',
                overflow: 'auto'
              }}
              onClick={() => {
                this.setSidebarDisplay(false)
              }}
            >
              {this.props.children}
            </main>
          </div>
        </div>
      </div>
    )
  }
}
