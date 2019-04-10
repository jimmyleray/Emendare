import React from 'react'
// Components
import { Icon, Column, Columns, Button } from '../..'
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
            amend.accepted ? 'has-text-success' : 'has-text-grey-light'
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
            !amend.accepted ? 'has-text-danger' : 'has-text-grey-light'
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
