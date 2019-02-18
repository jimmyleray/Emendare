/* eslint-disable jsx-a11y/label-has-for, sonarjs/cognitive-complexity */

import React from 'react'
import {
  Box,
  Divider,
  Icon,
  Grid,
  DataContext,
  SearchContext,
  Link,
  Spacer
} from '../../../components'
import { path } from '../../../config'
import { isUndefined, sortBy } from 'lodash'
import { IText } from '../../../interfaces'

export const Explore = () => {
  const dataContext = React.useContext(DataContext)
  const searchContext = React.useContext(SearchContext)
  const textsID = dataContext.get('texts')('all')

  let texts = []

  if (textsID && textsID.data) {
    texts = textsID.data
      .map(dataContext.get('text'))
      .filter((text: any) => !isUndefined(text))
      .map((text: any) => text.data)
      .filter(
        (text: IText) =>
          text.name
            .toLowerCase()
            .includes(searchContext.search.toLowerCase()) ||
          text.description
            .toLowerCase()
            .includes(searchContext.search.toLowerCase())
      )
  }

  return (
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
            <Divider className="is-hidden-tablet" style={{ margin: 0 }} />
            <Link
              to={path.text(text._id)}
              style={{ display: 'inline-grid' }}
              className="has-text-dark"
            >
              <Box style={{ marginBottom: '0px' }}>
                <div className="is-size-4 is-flex" style={{ flexWrap: 'wrap' }}>
                  <p>{text.name}</p>
                  <Spacer />
                  <p>
                    {text.followersCount}{' '}
                    <Icon
                      type={'fa fa-user' + (text.followersCount > 1 ? 's' : '')}
                    />
                  </p>
                </div>
                <p>{text.description}</p>
              </Box>
            </Link>
          </React.Fragment>
        ))}

      <Divider className="is-hidden-tablet" style={{ margin: 0 }} />
      <Link to={path.create} style={{ display: 'inline-grid' }}>
        <Box style={{ marginBottom: '0px' }} className="has-text-info">
          <div className="is-size-4 is-flex" style={{ flexWrap: 'wrap' }}>
            <p>Ajouter un texte</p>
            <Spacer />
            <p>
              <Icon type={'fa fa-plus-circle'} />
            </p>
          </div>
          <p>Accès au formulaire d'ajout</p>
        </Box>
      </Link>
    </Grid>
  )
}
