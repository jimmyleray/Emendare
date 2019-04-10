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
  UserContext,
  Hero
} from '../../../components'
import { Socket } from '../../../services'
import { path } from '../../../config'
import { debounce } from 'lodash'
import * as JsDiff from 'diff'

interface IEditProps {
  data: any
}

interface IEditState {
  amendName: string
  amendDescription: string
  redirectToAmend: boolean
  redirectID: string | null
  initialValue: string
  amendValue: string
  text: any
  patch: string | null
}

export class Edit extends React.Component<IEditProps, IEditState> {
  private onChange: any
  private restoreInitialValue: any
  private hasDiffs: any
  private addAmend: any

  private computeDiff = debounce(() => {
    const patch = JsDiff.createPatch(
      '',
      this.state.initialValue,
      this.state.amendValue,
      '',
      '',
      { context: 1 }
    )
    this.setState({ patch })
  }, 100)

  constructor(props: IEditProps) {
    super(props)

    this.onChange = (name: string) => (event: any) => {
      this.setState({ [name]: event.target.value } as any, () => {
        this.computeDiff()
      })
    }

    this.restoreInitialValue = () => {
      this.setState(
        prevState => ({ ...prevState, amendValue: prevState.initialValue }),
        () => {
          this.computeDiff()
        }
      )
    }

    this.hasDiffs = () => this.state.initialValue !== this.state.amendValue

    this.addAmend = () => {
      // Add a newline at the amendValue end
      // by default to avoid some conflicts
      if (!this.state.amendValue.endsWith('\n')) {
        this.setState(
          prevState => ({
            ...prevState,
            amendValue: prevState.initialValue + '\n'
          }),
          () => {
            this.computeDiff()
            this.postAmend()
          }
        )
      } else {
        this.postAmend()
      }
    }

    this.state = {
      amendName: '',
      amendDescription: '',
      redirectToAmend: false,
      redirectID: null,
      initialValue: this.props.data ? this.props.data.actual : '',
      amendValue: this.props.data ? this.props.data.actual : '',
      text: this.props.data,
      patch: null
    }
  }

  public componentDidMount() {
    this.computeDiff()
  }

  public componentWillUnmount() {
    Socket.off('postAmend')
  }

  public render() {
    if (this.state.redirectToAmend) {
      return <Redirect to={path.news} />
    }

    return (
      <UserContext.Consumer>
        {({ isConnected }: any) => (
          <React.Fragment>
            <Hero
              title="Proposition d'amendement"
              subtitle={this.props.data.name}
              className="has-text-centered"
            />

            <Buttons>
              {this.props.data && (
                <Button to={path.text(this.props.data._id)}>
                  <Icon type={'solid'} name="fa-chevron-left" />
                  <span>Retour au texte</span>
                </Button>
              )}
            </Buttons>

            <Columns>
              <Column>
                <div className="field">
                  <label htmlFor="title" className="label">
                    Titre de l'amendement
                    <div className="control">
                      <input
                        required
                        name="title"
                        className="input"
                        type="text"
                        autoFocus={true}
                        value={this.state.amendName}
                        onChange={this.onChange('amendName')}
                        placeholder="Nommez votre amendement en quelques mots"
                      />
                    </div>
                  </label>
                </div>

                <div className="field">
                  <label htmlFor="description" className="label">
                    Description / Argumentaire
                    <div className="control">
                      <textarea
                        required
                        rows={4}
                        name="description"
                        value={this.state.amendDescription}
                        onChange={this.onChange('amendDescription')}
                        className="textarea"
                        placeholder="Défendez votre amendement en quelques phrases"
                      />
                    </div>
                  </label>
                </div>

                <div className="field">
                  <label htmlFor="editor" className="label">
                    Editeur du texte
                    <div className="control">
                      <textarea
                        rows={12}
                        name="editor"
                        className="textarea"
                        value={this.state.amendValue}
                        onChange={this.onChange('amendValue')}
                      />
                    </div>
                  </label>
                </div>

                <Button
                  onClick={this.restoreInitialValue}
                  className="is-danger is-outlined"
                >
                  <Icon type={'solid'} name="fa-undo" />
                  <span>Restaurer le texte initial</span>
                </Button>
              </Column>

              <Column>
                <p className="has-text-centered is-size-4">
                  Pré-visualisation de votre amendement
                </p>
                <br />

                {this.hasDiffs() ? (
                  <Box>
                    <Amend
                      amend={{
                        name: this.state.amendName,
                        description: this.state.amendDescription,
                        patch: this.state.patch,
                        version: this.state.text.patches.length
                      }}
                      text={this.state.text}
                    />
                  </Box>
                ) : (
                  <Box>
                    <p className="has-text-centered has-text-danger">
                      Aucune modification à afficher
                    </p>
                  </Box>
                )}

                <Button
                  onClick={this.addAmend}
                  disabled={
                    !this.hasDiffs() ||
                    !this.state.amendName ||
                    !this.state.amendDescription ||
                    !isConnected()
                  }
                  className="is-success is-fullwidth"
                >
                  Proposer cet amendement
                </Button>
              </Column>
            </Columns>
          </React.Fragment>
        )}
      </UserContext.Consumer>
    )
  }

  private postAmend = () => {
    Socket.fetch('postAmend', {
      name: this.state.amendName,
      description: this.state.amendDescription,
      version: this.state.text.patches.length,
      patch: this.state.patch,
      textID: this.state.text._id
    }).then((amend: any) => {
      this.setState({ redirectID: amend._id, redirectToAmend: true })
    })
  }
}
