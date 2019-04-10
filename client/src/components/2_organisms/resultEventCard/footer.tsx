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
  /** Conflicted with an other amend */
  isConfliced: boolean
  /** Realted Amend */
  amend: IAmend
}

export const Footer = React.memo(({ amend, isConfliced }: IResultIconProps) => (
  <Columns className="is-mobile">
    <Column className="is-one-third">
      <div
        className={
          isMaxVote('upVotesCount', amend.results, isConfliced)
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
          isMaxVote('downVotesCount', amend.results, isConfliced)
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
))
