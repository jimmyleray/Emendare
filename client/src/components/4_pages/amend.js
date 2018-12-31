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
  Page,
  Results
} from '../../components'
import { socket } from '../../services'
import diff_match_patch from 'diff-match-patch'
import { path } from '../../config'

export class AmendPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      amend: null,
      error: null
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
                <Box>
                  <p className="is-size-5 has-text-centered has-text-weight-semibold">
                    Vote en cours sur l'amendement
                  </p>
                  <Results value={54.7} />
                </Box>
              </Column>
            </Columns>
          </>
        )}
      </Page>
    )
  }
}
