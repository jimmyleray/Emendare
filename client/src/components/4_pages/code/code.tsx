import React from 'react'
import { Hero, Page, I18nContext } from '../../../components'

const CodePage = () => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Page title={translate('ETHIC_CODE')}>
      <Hero
        title={translate('ETHIC_CODE')}
        subtitle={translate('OUR_MOTIVATIONS')}
      />
      <div>
        <p>{translate('ETHIC_CODE_1_1')}</p>
        <p>{translate('ETHIC_CODE_1_2')}</p>
        <p>{translate('ETHIC_CODE_1_3')}</p>
        <br />
        <p>{translate('ETHIC_CODE_2_1')}</p>
        <p>{translate('ETHIC_CODE_2_2')}</p>
        <p>{translate('ETHIC_CODE_2_3')}</p>
        <br />
        <p>{translate('ETHIC_CODE_3_1')}</p>
        <p>{translate('ETHIC_CODE_3_2')}</p>
        <p>{translate('ETHIC_CODE_3_3')}</p>
      </div>
    </Page>
  )
}

export default CodePage
