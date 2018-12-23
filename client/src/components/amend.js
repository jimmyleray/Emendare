import React from 'react'
import { Link } from 'react-router-dom'
import { Spacer } from './spacer'
import diff_match_patch from 'diff-match-patch'

export class Amend extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = name => event => {
      this.setState({ [name]: event.target.value }, () => {
        if (name === 'value') {
          this.computeDiff()
        }
      })
    }

    this.restoreInitialValue = event => {
      this.setState({ value: this.state.initialValue }, () => {
        this.computeDiff()
      })
    }

    this.hasDiffs = () => this.state.initialValue !== this.state.value

    this.state = {
      amendComplexity: 0,
      textSizeDisplayed: 100,
      initialValue: props.data.actual,
      value: props.data.actual,
      diffs: []
    }
  }

  componentDidMount() {
    this.computeDiff()
  }

  computeDiff() {
    const dmp = new diff_match_patch()
    dmp.Diff_EditCost = 8
    const diffs = dmp.diff_main(this.state.initialValue, this.state.value)
    dmp.diff_cleanupEfficiency(diffs)
    const amendComplexity = dmp.diff_levenshtein(diffs)
    this.setState({ diffs, amendComplexity })
    // console.log(diffs)
    // console.log(dmp.patch_toText(dmp.patch_make(diffs)))
  }

  render() {
    return (
      <>
        <div className="buttons">
          {this.props.data.group && (
            <Link to={'/text/' + this.props.data._id} className="button">
              <span className="icon">
                <i className="fas fa-chevron-left" />
              </span>
              <span>Retour au texte</span>
            </Link>
          )}

          <Spacer />

          <button disabled className="button is-success">
            Proposer cet amendement
          </button>
        </div>

        <div className="columns">
          <div className="column">
            <div className="box">
              <p>
                Paramètres | <b>{this.props.data.group.name}</b>
              </p>
              <p>
                Description : {'Règles du groupe ' + this.props.data.group.name}
              </p>
            </div>

            <div className="field">
              <div className="control">
                <textarea
                  rows="12"
                  className="textarea"
                  value={this.state.value}
                  onChange={this.onChange('value')}
                />
              </div>
            </div>

            <button
              onClick={this.restoreInitialValue}
              className="button is-danger is-outlined"
            >
              <span className="icon">
                <i className="fas fa-undo" />
              </span>
              <span>Restaurer le texte initial</span>
            </button>
          </div>

          <div className="column">
            <div className="box">
              <p className="has-text-centered is-size-4">
                Pré-visualisation de votre amendement
              </p>
              <p className="has-text-centered is-size-5">
                Complexité : {this.state.amendComplexity}
              </p>
              <br />

              <div>
                {this.hasDiffs() ? (
                  this.state.diffs.map((part, index) => (
                    <span
                      key={index}
                      className={
                        part[0] === 1
                          ? 'has-text-weight-bold has-text-success'
                          : part[0] === -1
                          ? 'has-text-weight-bold has-text-danger'
                          : 'has-text-grey-light'
                      }
                    >
                      {part[1].split('\n').map((line, index) => {
                        return line ? (
                          <span key={index}>
                            {line.length > this.state.textSizeDisplayed * 2
                              ? line.slice(0, this.state.textSizeDisplayed) +
                                ' (...) ' +
                                line.slice(-this.state.textSizeDisplayed, -1)
                              : line}
                          </span>
                        ) : (
                          <br key={index} />
                        )
                      })}
                    </span>
                  ))
                ) : (
                  <p className="has-text-centered has-text-danger">
                    Aucune modification à afficher
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
