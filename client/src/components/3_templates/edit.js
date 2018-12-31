import React from 'react'
import { Redirect } from 'react-router-dom'
import {
  Amend,
  Box,
  Button,
  Buttons,
  Column,
  Columns,
  Icon,
  Notification,
  Progress,
  Spacer,
  UserContext
} from '../../components'
import { socket } from '../../services'
import diff_match_patch from 'diff-match-patch'
import { path } from '../../config'

export class Edit extends React.Component {
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

    this.addAmend = async () => {
      await socket.fetch('postAmend', {
        name: this.state.amendName,
        description: this.state.amendDescription,
        version: this.props.data.patches.length,
        patch: this.state.patch,
        textID: this.props.data._id
      })
      socket.emit('user')
      this.setState({ redirectToText: true })
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
      return <Redirect to={path.text(this.props.data._id)} />

    return (
      <UserContext.Consumer>
        {({ isConnected }) => (
          <>
            <div className="field has-text-centered">
              <h1 className="is-size-3">Proposition d'amendement</h1>
              <h2 className="is-size-5">
                {this.props.data.rules
                  ? this.props.data.group.name
                  : this.props.data.name}
              </h2>
            </div>
            <br />

            <Buttons>
              {this.props.data.group && (
                <Button to={path.text(this.props.data._id)}>
                  <Icon type="fas fa-chevron-left" />
                  <span>Retour au texte</span>
                </Button>
              )}

              <Spacer />
            </Buttons>

            <Columns>
              <Column>
                <div className="field">
                  <label className="label">Titre de l'amendement</label>
                  <div className="control">
                    <input
                      required
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
                      required
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
                  <Icon type="fas fa-undo" />
                  <span>Restaurer le texte initial</span>
                </button>
              </Column>

              <Column>
                <Notification>
                  <Progress
                    className={
                      'is-small ' +
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
                    de proposer des amendements avec une complexité moderée.
                  </p>
                </Notification>

                <p className="has-text-centered is-size-4">
                  Pré-visualisation de votre amendement
                </p>
                <br />

                {this.hasDiffs() ? (
                  <Amend
                    data={{
                      name: this.state.amendName,
                      description: this.state.amendDescription,
                      diffs: this.state.diffs
                    }}
                  />
                ) : (
                  <Box>
                    <p className="has-text-centered has-text-danger">
                      Aucune modification à afficher
                    </p>
                  </Box>
                )}

                <Button
                  onClick={this.addAmend}
                  disabled={!this.hasDiffs() || !isConnected()}
                  className="is-success is-fullwidth"
                >
                  Proposer cet amendement
                </Button>
              </Column>
            </Columns>
          </>
        )}
      </UserContext.Consumer>
    )
  }
}
