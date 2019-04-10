import React from 'react'
import { Divider, DiffPreview } from '../../../components'
import { IAmend, IText } from '../../../../../interfaces'

interface IAmendProps {
  /** Current amend object */
  amend?: Partial<IAmend>
  /** Current text object */
  text?: IText
}

export const Amend = ({ amend, text }: IAmendProps) => (
  <React.Fragment>
    <p>{amend && amend.description}</p>
    <Divider content="Modifications proposées" />
    {amend && text && <DiffPreview amend={amend} text={text} />}
  </React.Fragment>
)
