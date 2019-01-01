/*
 * Page de détails d'un amendement
 * Le but de cette page est de permettre aux utilisateurs :
 * - d'accéder au détail d'un amendement
 * - TODO : de visualiser le vote de l'amendement
 * - TODO : de participer au vote sur l'amendement
 */

import React from 'react'
import {
  Amend,
  Box,
  Button,
  Buttons,
  Column,
  Columns,
  ErrorPage,
  Icon,
  Notification,
  Page,
  Results
} from '../../components'
import { socket } from '../../services'
import diff_match_patch from 'diff-match-patch'
import { path } from '../../config'

export class AmendPage extends React.Component {
  constructor(props) {
    super(props)

    this.upVote = () => {
      this.setState({ upVoted: true, downVoted: false })
    }

    this.downVote = () => {
      this.setState({ upVoted: false, downVoted: true })
    }

    this.unVote = () => {
      this.setState({ upVoted: false, downVoted: false })
    }

    this.state = {
      index: 0,
      amend: null,
      error: null,
      upVoted: false,
      downVoted: false
    }
  }

  fetchData() {
    socket
      .fetch('amend', { id: this.props.match.params.id })
      .then(amend => {
        this.setState({ amend }, () => {
          this.computeDiff()
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  componentDidMount() {
    this.fetchData()
    this.interval = setInterval(() => {
      this.setState({ index: this.state.index + 1 })
    }, 10 * 1000)
  }

  componentWillUnmount() {
    socket.off('amend')
    clearInterval(this.interval)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData()
    }
  }

  computeDiff() {
    const dmp = new diff_match_patch()
    dmp.Diff_EditCost = 8
    const res = dmp.patch_apply(
      dmp.patch_fromText(this.state.amend.patch),
      this.state.amend.text.actual
    )
    const newText = res[0]
    const diffs = dmp.diff_main(this.state.amend.text.actual, newText)
    dmp.diff_cleanupEfficiency(diffs)
    this.setState({ amend: { diffs, ...this.state.amend } })
  }

  getTitle() {
    return this.state.amend
      ? 'Amendement ' + this.state.amend.name
      : 'Amendement'
  }

  render() {
    if (this.state.error) return <ErrorPage />

    return (
      <Page title={this.getTitle()}>
        {this.state.amend && (
          <>
            <Buttons>
              <Button to={path.text(this.state.amend.text._id)}>
                <Icon type="fas fa-chevron-left" />
                <span>Retour au texte</span>
              </Button>
            </Buttons>
            <Columns>
              <Column>
                <Amend data={this.state.amend} />
              </Column>
              <Column>
                <Notification>
                  <p>
                    Le vote est clos à la fin du temps imparti ou dès lors
                    qu'une majorité absolue est atteinte. Le vote est liquide,
                    ce qui veut dire que vous pouvez changer votre vote jusqu'à
                    la fin du scrutin.
                  </p>
                </Notification>
                <Box key={this.state.index}>
                  <p className="is-size-5 has-text-centered has-text-weight-semibold">
                    Scrutin en cours sur l'amendement
                  </p>

                  <p className="has-text-centered">
                    Temps restant avant la fin du scrutin :{' '}
                    <span className="has-text-weight-semibold">
                      {
                        -Math.floor(
                          (new Date().getTime() -
                            (new Date(this.state.amend.created).getTime() +
                              2 * 3600 * 1000)) /
                            (1000 * 60)
                        )
                      }{' '}
                      minutes
                    </span>
                  </p>
                  <br/>
                  <Results value={50} />
                  <hr />

                  <Buttons className="is-fullwidth">
                    <Button
                      className={this.state.upVoted ? 'is-success' : 'is-light'}
                      onClick={this.upVote}
                      style={{ flex: 1 }}
                    >
                      Voter pour
                    </Button>
                    <Button
                      className={
                        !this.state.upVoted && !this.state.downVoted
                          ? 'is-dark'
                          : 'is-light'
                      }
                      onClick={this.unVote}
                      style={{ flex: 1 }}
                    >
                      S'abstenir
                    </Button>
                    <Button
                      className={
                        this.state.downVoted ? 'is-danger' : 'is-light'
                      }
                      onClick={this.downVote}
                      style={{ flex: 1 }}
                    >
                      Voter contre
                    </Button>
                  </Buttons>
                </Box>
              </Column>
            </Columns>
          </>
        )}
      </Page>
    )
  }
}
