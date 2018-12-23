import React from 'react'
import { Link } from 'react-router-dom'
import { Markdown } from '../components'
import { Spacer } from './spacer'

export class Amend extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = event => {
      this.setState({ value: event.target.value }, () => {
        this.computeDiff()
      })
    }

    this.state = {
      initialValue: props.data.actual,
      value: props.data.actual,
      diff: []
    }
  }

  componentDidMount() {
    this.computeDiff()
  }

  computeDiff() {
    /*eslint no-undef: "off"*/
    const dmp = new diff_match_patch()
    dmp.Diff_EditCost = 8
    const diff = dmp.diff_main(this.state.initialValue, this.state.value)
    dmp.diff_cleanupEfficiency(diff)
    this.setState({ diff })
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
                Paramètres | <strong>{this.props.data.group.name}</strong>
              </p>
              <p>
                Description : {'Règles du groupe ' + this.props.data.group.name}
              </p>
              <p>
                Crée le : {new Date(this.props.data.created).toLocaleString()}
              </p>

              <div className="field">
                <div className="control">
                  <textarea
                    rows="12"
                    className="textarea"
                    value={this.state.value}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div className="notification is-info">
              <p>
                L'éditeur utilise le Markdown{' '}
                <span className="icon">
                  <i className="fab fa-markdown" />
                </span>{' '}
                pour vous permettre d'enrichir le texte avec par exemple des
                titres, des listes, des liens, ou des images.{' '}
                <a href="https://fr.wikipedia.org/wiki/Markdown">
                  Page Wikipédia sur le Markdown
                </a>
              </p>
            </div>
          </div>

          <div className="column">
            <div className="box">
              <p>Pré-visualisation de votre amendement</p>
              {this.state.diff.map((part, index) => (
                <Markdown
                  key={index}
                  className={
                    part[0] === 1
                      ? 'has-text-success'
                      : part[0] === -1
                      ? 'has-text-danger'
                      : ''
                  }
                >
                  {part[1]}
                </Markdown>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
}
