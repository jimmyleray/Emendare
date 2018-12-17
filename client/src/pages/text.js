import React from 'react'
import { Text, Page } from '../components'
import { api } from '../utils'

export class TextPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: null
    }
  }

  fetchData() {
    fetch(api('/text/' + this.props.match.params.id), {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(async res => {
      if (res.status === 200) {
        const text = await res.json()
        this.setState({ text })
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
      <Page title="Texte">
        {this.state.text && <Text data={this.state.text} />}
      </Page>
    )
  }
}
