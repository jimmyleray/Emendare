import React from 'react'
import { Box } from '..'
import * as JsDiff from 'diff'

interface IAmendProps {
  amend: any
  text: any
}

interface IAmendState {
  diffs: any[]
}

export class Amend extends React.Component<IAmendProps, IAmendState> {
  constructor(props: IAmendProps) {
    super(props)

    this.state = {
      diffs: []
    }
  }

  public componentWillMount() {
    this.computeDiff()
  }

  public componentDidUpdate(prevProps: IAmendProps) {
    if (prevProps.amend !== this.props.amend) {
      this.computeDiff()
    }
  }

  public render() {
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
            this.state.diffs.map((part: any, i: number) => (
              <p
                key={i}
                className={
                  part.added
                    ? 'has-text-weight-bold has-text-success'
                    : part.removed
                    ? 'has-text-weight-bold has-text-danger'
                    : 'has-text-grey-light'
                }
              >
                {part.count > 1
                  ? part.value.split('\n').map((line: string, j: number) => (
                      <span key={j}>
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

  private computeDiff() {
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
}
