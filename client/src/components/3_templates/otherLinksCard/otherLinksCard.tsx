import React from 'react'
import { Card, Link, I18nContext } from '../../../components'
import { path } from '../../../config'

export const OtherLinksCard = () => {
  const { translate } = React.useContext(I18nContext)

  return (
    <Card style={{ padding: '1rem' }}>
      <p
        className="is-size-5 has-text-weight-semibold"
        style={{ margin: '0.5rem 0 0.5rem 1rem' }}
      >
        A propos d'Emendare
      </p>
      <Link to={path.code} className="navbar-item">
        {translate('ETHIC_CODE')}
      </Link>
      <Link to={path.contributors} className="navbar-item">
        {translate('CONTRIBUTORS')}
      </Link>
      <Link to={path.legal} className="navbar-item">
        {translate('LEGAL_MENTIONS')}
      </Link>
      <Link to="https://github.com/jimmyleray/Emendare" className="navbar-item">
        {translate('SOURCES')}
      </Link>
    </Card>
  )
}
