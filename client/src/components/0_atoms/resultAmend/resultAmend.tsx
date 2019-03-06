import React from 'react'
import { I18nContext } from '../../../components'
import { IAmend } from '../../../../../interfaces'

interface IResultAmendProps {
  /** Amend data */
  amend: IAmend
}

export const ResultAmend = ({ amend }: IResultAmendProps) => {
  const { translate } = React.useContext(I18nContext)
  return (
    <div className="has-text-centered" style={{ paddingRight: '3rem' }}>
      <div className="message is-success">
        <div className="message-body">
          <div className="level">
            <div className="level-left">{translate('RES_UP_VOTE')}</div>
            <div className="level-right">
              <strong>{amend.results.upVotesCount}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="message is-info">
        <div className="message-body">
          <div className="level">
            <div className="level-left">{translate('RES_IND_VOTE')}</div>
            <div className="level-right">
              <strong>{amend.results.indVotesCount}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="message is-danger">
        <div className="message-body">
          <div className="level">
            <div className="level-left">{translate('RES_DOWN_VOTE')}</div>
            <div className="level-right">
              <strong>{amend.results.downVotesCount}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="message is-dark">
        <div className="message-body">
          <div className="level">
            <div className="level-left">{translate('RES_TOTAL_VOTE')}</div>
            <div className="level-right">
              <strong>{amend.results.totalPotentialVotesCount}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
