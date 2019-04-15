import React from 'react'
import { I18nContext, HomePage, DataContext } from '../../../components'
import { IEvent } from '../../../../../interfaces'

export const SharePage = ({ match }: any) => {
  // const { translate } = React.useContext(I18nContext)
  // const { get } = React.useContext(DataContext)
  // const event: IResponse<IEvent> = get('event')(match.params.id)

  return <HomePage />
}
