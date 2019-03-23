/* eslint-disable jsx-a11y/label-has-for, sonarjs/cognitive-complexity */

import React from 'react'
import {
  Box,
  Button,
  Divider,
  Icon,
  Grid,
  DataContext,
  I18nContext,
  Link,
  Spacer,
  Tag
} from '../../../components'
import { path } from '../../../config'
import { isUndefined, sortBy } from 'lodash'
import { IText } from '../../../../../interfaces'

export const Explore = () => {
  const dataContext = React.useContext(DataContext)
  const { translate } = React.useContext(I18nContext)
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
            placeholder={translate('SEARCH_A_TEXT')}
            value={search}
            onChange={event => {
              setSearch(event.target.value)
            }}
          />
          <Icon type="fa fa-search" className="is-right" />
        </p>
      </div>
      <Divider content={translate('TEXTS_LIST')} />
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
                  <p className="is-size-4">{text.name}</p>
                  <p>{text.description}</p>
                  <br />
                  <Tag className="is-medium">
                    <span>{text.followersCount}</span>
                    <Icon
                      type={'fa fa-user' + (text.followersCount > 1 ? 's' : '')}
                    />
                  </Tag>
                </Box>
              </Link>
              <Divider className="is-hidden-tablet" style={{ margin: 0 }} />
            </React.Fragment>
          ))}
      </Grid>
      <div style={{ paddingTop: '2rem' }}>
        <Link to={path.create}>
          <Button className="is-link is-fullwidth is-outlined">
            <Icon type="fa fa-plus" />
            <span>{translate('ADD_A_TEXT')}</span>
          </Button>
        </Link>
      </div>
    </React.Fragment>
  )
}
