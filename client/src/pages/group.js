import React from 'react'
import { Group, Page } from '../components'
import { api } from '../utils'

export class GroupPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      group: null
    }
  }

  fetchData() {
    fetch(api('/group/' + this.props.match.params.id), {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(async res => {
      if (res.status === 200) {
        const group = await res.json()
        this.setState({ group })
      }
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData()
    }
  }

  render() {
    return (
      <Page title="Groupe">
        {this.state.group && <Group data={this.state.group} />}
      </Page>
    )
  }
}
