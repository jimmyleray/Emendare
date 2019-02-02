import React from 'react'
import { Box } from '../../components'
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
              <div
                key={i}
                className={
                  !part.added && !part.removed ? 'has-text-grey-light' : ''
                }
              >
                {part.value
                  .split('\n')
                  .filter(
                    (line: string, index: number, arr: string[]) =>
                      index < arr.length - 1 || line !== ''
                  )
                  .map((line: string, j: number) => (
                    <p
                      key={j}
                      style={{
                        backgroundColor: part.added
                          ? 'rgba(35, 209, 96, 0.25)'
                          : part.removed
                          ? 'rgba(255, 56, 96, 0.25)'
                          : ''
                      }}
                    >
                      {line || <>&nbsp;</>}
                    </p>
                  ))}
              </div>
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
