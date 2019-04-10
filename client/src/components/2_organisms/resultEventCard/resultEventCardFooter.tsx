import React from 'react'
// Components
import { Icon, Column, Columns, Button } from '../..'
// Helpers
import { isMaxVote } from './helper'
// Configs
import { path } from '../../../config'
// Interfaces
import { IAmend } from '../../../../../interfaces'

interface IResultIconProps {
  /** Realted Amend */
  amend: IAmend
}

export const ResultEventCardFooter = React.memo(
  ({ amend }: IResultIconProps) => (
    <Columns className="is-mobile">
      <Column className="is-one-third">
        <div
          className={
            isMaxVote('upVotesCount', amend.results, amend.conflicted)
              ? 'has-text-success'
              : 'has-text-grey-light'
          }
        >
          <Icon
            type={'solid'}
            name="fa-thumbs-up"
            size="fa-lg"
            style={{ marginRight: '0.5rem' }}
          />
          {amend.results.upVotesCount}
        </div>
      </Column>
      <Column className="is-one-third">
        <div
          className={
            isMaxVote('downVotesCount', amend.results, amend.conflicted)
              ? 'has-text-danger'
              : 'has-text-grey-light'
          }
        >
          <Icon
            type={'solid'}
            name="fa-thumbs-down"
            size="fa-lg"
            style={{ marginRight: '0.5rem' }}
          />
          {amend.results.downVotesCount}
        </div>
      </Column>
      <Column>
        <Button
          style={{ border: 'none', padding: 'none', display: 'inline' }}
          to={path.amend(amend._id)}
          className="has-text-grey-light"
        >
          <Icon
            type={'solid'}
            name="fa-info-circle"
            size="fa-lg"
            style={{ marginRight: '0.5rem' }}
          />
        </Button>
      </Column>
    </Columns>
  )
)
