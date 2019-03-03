import React from 'react'
import { Divider } from '../../../components'
import * as JsDiff from 'diff'
import { IAmend, IText } from '../../../../../interfaces'

interface IAmendProps {
  /** Current amend object */
  amend?: Partial<IAmend>
  /** Current text object */
  text?: IText
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
    let lineCounter = 0

    return (
      <React.Fragment>
        <p>{this.props.amend && this.props.amend.description}</p>

        <Divider content="Modifications proposées" />
        <div>
          {this.state.diffs &&
            this.state.diffs.map((part: any, i: number, diffs: any[]) => (
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
                  .map((line: string, j: number, arr: string[]) => {
                    lineCounter++
                    return part.added || part.removed ? (
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
                        <span>{lineCounter}&nbsp;|&nbsp;</span>
                        <span>
                          {line || <React.Fragment>&nbsp;</React.Fragment>}
                        </span>
                      </p>
                    ) : (j === 0 && i !== 0) ||
                      (j === 1 && i !== 0 && arr[j] === '') ||
                      (j === arr.length - 1 && i !== diffs.length - 1) ||
                      (j === arr.length - 2 &&
                        i !== diffs.length - 1 &&
                        arr[arr.length - 1] === '') ? (
                      <React.Fragment key={j}>
                        <p>
                          <span>{lineCounter}&nbsp;|&nbsp;</span>
                          {line || <React.Fragment>&nbsp;</React.Fragment>}
                        </p>
                        {arr.length > 1 &&
                          j === 0 &&
                          i !== diffs.length - 1 && <hr />}
                      </React.Fragment>
                    ) : null
                  })}
              </div>
            ))}
        </div>
      </React.Fragment>
    )
  }

  private computeDiff() {
    if (this.props.amend && this.props.text) {
      let previousText = ''

      for (let index = 0; index < (this.props.amend.version || 0); index++) {
        previousText = JsDiff.applyPatch(
          previousText,
          this.props.text.patches[index]
        )
      }

      const newText = JsDiff.applyPatch(
        previousText,
        this.props.amend.patch || ''
      )
      const diffs = JsDiff.diffLines(previousText, newText)
      this.setState({ diffs })
    }
  }
}
