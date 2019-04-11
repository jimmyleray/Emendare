import React from 'react'
// Components
import { Icon, Column, Columns, Button } from '../../../components'
// Interfaces
import { IAmend } from '../../../../../interfaces'

interface IResultIconProps {
  /** Realted Amend */
  amend: IAmend
}

export const ResultEventCardFooter = React.memo(
  ({ amend }: IResultIconProps) => (
    <Columns className="is-mobile has-text-centered">
      <Column className="is-one-third">
        <div
          className={
            amend.accepted ? 'has-text-success' : 'has-text-grey-light'
          }
        >
          <Icon
            type={'solid'}
            size={'fa-lg'}
            name="fa-thumbs-up"
            style={{ marginRight: '0.5em' }}
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
            size={'fa-lg'}
            name={'fa-thumbs-down'}
            style={{ marginRight: '0.5em' }}
          />
          {amend.results.downVotesCount}
        </div>
      </Column>
      {navigator && (navigator as any).clipboard && (
        <Column className="is-one-third">
          <Button
            onClick={async () => {
              const url = new URL(`/${amend._id}`, location.origin)
              await (navigator as any)!.clipboard!.writeText(url.href)
            }}
            style={{
              border: 'none',
              height: '24px',
              outline: 'none'
            }}
            className={'has-text-info'}
          >
            <Icon type={'light'} size={'fa-lg'} name="fa-share" />
          </Button>
        </Column>
      )}
    </Columns>
  )
)
