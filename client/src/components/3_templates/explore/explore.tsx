/* eslint-disable jsx-a11y/label-has-for, sonarjs/cognitive-complexity */

import React from 'react'
import {
  Box,
  Button,
  Divider,
  Icon,
  Grid,
  DataContext,
  Link,
  Spacer
} from '../../../components'
import { path } from '../../../config'
import { isUndefined, sortBy } from 'lodash'
import { IText } from '../../../../../interfaces'

export const Explore = () => {
  const dataContext = React.useContext(DataContext)
  const textsID = dataContext.get('texts')('all')
  const [search, setSearch] = React.useState('')

  let texts = []

  if (textsID && textsID.data) {
    texts = textsID.data
      .map(dataContext.get('text'))
      .filter((text: any) => !isUndefined(text))
      .map((text: any) => text.data)
      .filter(
        (text: IText) =>
          text.name.toLowerCase().includes(search.toLowerCase()) ||
          text.description.toLowerCase().includes(search.toLowerCase())
      )
  }

  return (
    <React.Fragment>
      <div className="field">
        <p className="control has-icons-right">
          <input
            className="input is-rounded"
            type="text"
            placeholder="Rechercher un texte"
            value={search}
            onChange={event => {
              setSearch(event.target.value)
            }}
          />
          <Icon type="fa fa-search" className="is-right" />
        </p>
      </div>
      <Divider content="Liste des textes" />
      <Grid
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: '1.5rem'
        }}
      >
        {sortBy(texts, ['followersCount'])
          .reverse()
          .map(text => (
            <React.Fragment key={text._id}>
              <Link
                to={path.text(text._id)}
                style={{ display: 'inline-grid' }}
                className="has-text-dark"
              >
                <Box style={{ marginBottom: '0px' }}>
                  <div
                    className="is-size-4 is-flex"
                    style={{ flexWrap: 'wrap' }}
                  >
                    <p>{text.name}</p>
                    <Spacer />
                    <p>
                      {text.followersCount}{' '}
                      <Icon
                        type={
                          'fa fa-user' + (text.followersCount > 1 ? 's' : '')
                        }
                      />
                    </p>
                  </div>
                  <p>{text.description}</p>
                </Box>
              </Link>
              <Divider className="is-hidden-tablet" style={{ margin: 0 }} />
            </React.Fragment>
          ))}

        <Link
          to={path.create}
          style={{ display: 'inline-grid', gridColumnStart: 1 }}
        >
          <Button className="is-info">
            <Icon type="fa fa-plus" />
            <span>Ajouter un texte</span>
          </Button>
        </Link>
      </Grid>
    </React.Fragment>
  )
}
