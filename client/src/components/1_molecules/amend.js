import React from 'react'
import { Box } from '../../components'
import * as JsDiff from 'diff'

export class Amend extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      diffs: []
    }
  }

  componentWillMount() {
    this.computeDiff()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.amend !== this.props.amend) {
      this.computeDiff()
    }
  }

  computeDiff() {
    let previousText = ''

    for (let index = 0; index < this.props.amend.version; index++) {
      previousText = JsDiff.applyPatch(
        previousText,
        this.props.text.patches[index]
      )
    }
    const newText = JsDiff.applyPatch(previousText, this.props.amend.patch)
    const diffs = JsDiff.diffLines(previousText, newText)
    this.setState({ diffs })
  }

  render() {
    return (
      <Box>
        <p className="has-text-centered is-size-5">
          Amendement sur : {this.props.text.name}
        </p>
        <p className="has-text-centered is-size-5 has-text-weight-bold">
          {this.props.amend.name}
        </p>
        <br />
        <p>{this.props.amend.description}</p>
        <hr />
        <div>
          {this.state.diffs &&
            this.state.diffs.map((part, index) => (
              <p
                key={index}
                className={
                  part.added
                    ? 'has-text-weight-bold has-text-success'
                    : part.removed
                    ? 'has-text-weight-bold has-text-danger'
                    : 'has-text-grey-light'
                }
              >
                {part.count > 1
                  ? part.value.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))
                  : part.value}
              </p>
            ))}
        </div>
      </Box>
    )
  }
}
