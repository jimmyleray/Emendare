/* eslint-disable jsx-a11y/label-has-for, sonarjs/cognitive-complexity */

import React from 'react'
import {
  Box,
  Button,
  Column,
  Columns,
  UserContext,
  DataContext,
  Link,
  Notification
} from '../../components'
import { path } from '../../config'
import { Socket } from '../../services'
import { chunk, sortBy } from 'lodash'

const colors = [
  { class: 'is-link', name: 'Bleu' },
  { class: 'is-info', name: 'Ciel' },
  { class: 'is-primary', name: 'Cyan' },
  { class: 'is-success', name: 'Vert' },
  { class: 'is-warning', name: 'Jaune' },
  { class: 'is-danger', name: 'Rouge' }
]

interface IExploreState {
  displayAddGroupForm: boolean
  groupName: string
  groupDescription: string
  groupWhitelist: string
  groupColor: string
}

export class Explore extends React.Component<{}, IExploreState> {
  private onChange: any
  private confirm: any
  private initialState: any

  constructor(props: {}) {
    super(props)

    this.onChange = (name: string) => (event: any) => {
      this.setState({ [name]: event.target.value } as any)
    }

    this.confirm = async () => {
      await Socket.fetch('postGroup', {
        name: this.state.groupName,
        description: this.state.groupDescription,
        whitelist: this.state.groupWhitelist,
        color: this.state.groupColor
      })
      this.setState({ displayAddGroupForm: false, ...this.initialState })
    }

    this.initialState = {
      groupName: '',
      groupDescription: '',
      groupWhitelist: '*',
      groupColor: 'is-link'
    }

    this.state = {
      displayAddGroupForm: false,
      ...this.initialState
    }
  }

  public render() {
    return (
      <UserContext.Consumer>
        {({ isConnected }) => (
          <DataContext.Consumer>
            {({ get }) => {
              const groups = get('group')('all')

              return groups && groups.data ? (
                <>
                  {isConnected() && (
                    <>
                      <br />
                      <Button
                        className="is-fullwidth"
                        onClick={() => {
                          this.setState({
                            displayAddGroupForm: !this.state.displayAddGroupForm
                          })
                        }}
                      >
                        <span>
                          {this.state.displayAddGroupForm
                            ? 'Annuler la création du groupe'
                            : 'Créer un nouveau groupe'}
                        </span>
                      </Button>
                    </>
                  )}

                  {isConnected() &&
                    this.state.displayAddGroupForm && (
                      <>
                        <Box style={{ marginBottom: 0 }}>
                          <Columns>
                            <Column>
                              <div className="field">
                                <label htmlFor="name" className="label">
                                  Nom du groupe
                                  <div className="control">
                                    <input
                                      required
                                      name="name"
                                      className="input"
                                      type="text"
                                      value={this.state.groupName}
                                      onChange={this.onChange('groupName')}
                                      placeholder="Dénomination du nouveau groupe"
                                    />
                                  </div>
                                </label>
                              </div>
                            </Column>
                            <Column>
                              <div className="field">
                                <label htmlFor="description" className="label">
                                  Description du groupe
                                  <div className="control">
                                    <input
                                      required
                                      name="description"
                                      className="input"
                                      type="text"
                                      value={this.state.groupDescription}
                                      onChange={this.onChange(
                                        'groupDescription'
                                      )}
                                      placeholder="Description du nouveau groupe"
                                    />
                                  </div>
                                </label>
                              </div>
                            </Column>
                          </Columns>
                          <Columns>
                            <Column>
                              <div className="field">
                                <label htmlFor="description" className="label">
                                  Liste blanche{' '}
                                  <span className="has-text-weight-semibold">
                                    (patterns d'emails séparés par des virgules)
                                  </span>
                                  <div className="control">
                                    <input
                                      required
                                      name="description"
                                      className="input"
                                      type="text"
                                      value={this.state.groupWhitelist}
                                      onChange={this.onChange('groupWhitelist')}
                                      placeholder="Description du nouveau groupe"
                                    />
                                  </div>
                                </label>
                              </div>
                            </Column>
                            <Column>
                              <div className="field">
                                <span className="label">Couleur du groupe</span>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexWrap: 'wrap'
                                  }}
                                >
                                  {colors.map(color => (
                                    <Button
                                      key={color.name}
                                      className={
                                        'is-rounded ' +
                                        (color.class === this.state.groupColor
                                          ? 'is-focused ' + color.class
                                          : '')
                                      }
                                      style={{ flex: 1 }}
                                      onClick={() => {
                                        this.setState({
                                          groupColor: color.class
                                        })
                                      }}
                                    >
                                      {color.name}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            </Column>
                          </Columns>
                        </Box>
                        <Button
                          className="is-fullwidth is-success"
                          disabled={
                            !this.state.groupName ||
                            !this.state.groupDescription ||
                            !this.state.groupWhitelist ||
                            !this.state.groupColor
                          }
                          onClick={this.confirm}
                        >
                          Confirmer la création du groupe
                        </Button>
                      </>
                    )}
                  <br />
                  {chunk(
                    sortBy(groups.data, ['followersCount']).reverse(),
                    3
                  ).map((row, index) => (
                    <Columns key={index}>
                      {row.map((group: any) => (
                        <Column key={group._id} className="is-one-third">
                          <Link to={path.group(group._id)}>
                            <Notification
                              className={group.color || colors[0].class}
                            >
                              <p className="is-size-3">{group.name}</p>
                              <p>{group.description}</p>
                              <p>
                                {group.followersCount} membre
                                {group.followersCount > 1 ? 's' : ''}
                              </p>
                            </Notification>
                          </Link>
                        </Column>
                      ))}
                    </Columns>
                  ))}
                </>
              ) : (
                <></>
              )
            }}
          </DataContext.Consumer>
        )}
      </UserContext.Consumer>
    )
  }
}
