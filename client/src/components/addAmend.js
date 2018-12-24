import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { UserContext } from '../contexts'
import { Spacer } from './spacer'
import { apiFetch } from '../utils'
import diff_match_patch from 'diff-match-patch'

export class AddAmend extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = name => event => {
      this.setState({ [name]: event.target.value }, () => {
        if (name === 'amendValue') {
          this.computeDiff()
        }
      })
    }

    this.restoreInitialValue = event => {
      this.setState({ amendValue: this.state.initialValue }, () => {
        this.computeDiff()
      })
    }

    this.hasDiffs = () => this.state.initialValue !== this.state.amendValue

    this.addAmend = fetchUser => event => {
      apiFetch('/addAmend/' + this.props.data._id, {
        method: 'post',
        body: JSON.stringify({
          name: this.state.amendName,
          description: this.state.amendDescription,
          version: this.props.data.version,
          patch: this.state.patch
        })
      }).then(async res => {
        if (res.status === 200) {
          await fetchUser()
          this.setState({ redirectToText: true })
        }
      })
    }

    this.state = {
      amendName: '',
      amendDescription: '',
      amendComplexity: 0,
      textSizeDisplayed: 100,
      redirectToText: false,
      initialValue: props.data.actual,
      amendValue: props.data.actual,
      patch: null,
      diffs: []
    }
  }

  componentDidMount() {
    this.computeDiff()
  }

  computeDiff() {
    const dmp = new diff_match_patch()
    dmp.Diff_EditCost = 8
    const diffs = dmp.diff_main(this.state.initialValue, this.state.amendValue)
    dmp.diff_cleanupEfficiency(diffs)
    const amendComplexity = dmp.diff_levenshtein(diffs)
    const patch = dmp.patch_toText(dmp.patch_make(diffs))
    this.setState({ diffs, amendComplexity, patch })
  }

  render() {
    if (this.state.redirectToText)
      return <Redirect to={'/texte/' + this.props.data._id} />

    return (
      <UserContext.Consumer>
        {({ isConnected, fetchUser }) => (
          <>
            <div className="buttons">
              {this.props.data.group && (
                <Link to={'/texte/' + this.props.data._id} className="button">
                  <span className="icon">
                    <i className="fas fa-chevron-left" />
                  </span>
                  <span>Retour au texte</span>
                </Link>
              )}

              <Spacer />
            </div>

            <div className="columns">
              <div className="column">
                <div className="box">
                  <p>
                    {this.props.data.rules
                      ? 'Paramètres'
                      : this.props.data.group.name}{' '}
                    |{' '}
                    <strong>
                      {this.props.data.rules
                        ? this.props.data.group.name
                        : this.props.data.name}
                    </strong>
                  </p>
                  <p>
                    Description :{' '}
                    {this.props.data.rules
                      ? 'Règles du groupe ' + this.props.data.group.name
                      : this.props.data.description}
                  </p>
                </div>

                <div className="field">
                  <label className="label">Titre de l'amendement</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={this.state.amendName}
                      onChange={this.onChange('amendName')}
                      placeholder="Nommez votre amendement en quelques mots"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Description / Argumentaire</label>
                  <div className="control">
                    <textarea
                      rows="4"
                      value={this.state.amendDescription}
                      onChange={this.onChange('amendDescription')}
                      className="textarea"
                      placeholder="Défendez votre amendement en quelques phrases"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Editeur du texte</label>
                  <div className="control">
                    <textarea
                      rows="12"
                      className="textarea"
                      value={this.state.amendValue}
                      onChange={this.onChange('amendValue')}
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
                <div className="notification">
                  <progress
                    className={
                      'progress is-small ' +
                      (this.state.amendComplexity >= 400
                        ? 'is-danger'
                        : this.state.amendComplexity >= 200
                        ? 'is-warning'
                        : 'is-success')
                    }
                    value={this.state.amendComplexity}
                    max={500}
                  />
                  <p>
                    La complexité est donnée à titre indicatif et ne vous limite
                    pas. Une complexité trop élevée peut cependant nuire à
                    l'adoption de votre amendement. Nous vous conseillons donc
                    de proposer des amendements à faible complexité.
                  </p>
                </div>

                <p className="has-text-centered is-size-4">
                  Pré-visualisation de votre amendement
                </p>
                <br />

                <div className="box">
                  <p className="has-text-centered is-size-5">
                    {this.state.amendName}
                  </p>
                  <p>{this.state.amendDescription}</p>
                  {this.hasDiffs() && <hr />}
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
                          {part[0] === 1 ? '(+)' : part[0] === -1 ? '[-]' : ''}
                          {part[1].split('\n').map((line, index) => {
                            return line ? (
                              <span key={index}>
                                {line.length > this.state.textSizeDisplayed * 2
                                  ? line.slice(
                                      0,
                                      this.state.textSizeDisplayed
                                    ) +
                                    ' (...) ' +
                                    line.slice(
                                      -this.state.textSizeDisplayed,
                                      -1
                                    )
                                  : line}
                              </span>
                            ) : (
                              <br key={index} />
                            )
                          })}
                          {part[0] === 1 ? '(+)' : part[0] === -1 ? '[-]' : ''}
                        </span>
                      ))
                    ) : (
                      <p className="has-text-centered has-text-danger">
                        Aucune modification à afficher
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={this.addAmend(fetchUser)}
                  disabled={!this.hasDiffs() || !isConnected()}
                  className="button is-success is-fullwidth"
                >
                  Proposer cet amendement
                </button>
              </div>
            </div>
          </>
        )}
      </UserContext.Consumer>
    )
  }
}
