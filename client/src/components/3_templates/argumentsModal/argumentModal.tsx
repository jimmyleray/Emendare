import React from 'react'
import {
  ModalContainer,
  EditArgument,
  ArgumentsList,
  Divider,
  AmendEventCard
} from '../../../components'
// Interfaces
import { IAmend, IUser } from '../../../../../interfaces'
// Helpers
import { getListArgumentsWithPopularSorting } from './helpers'

interface IArgumentModalProps {
  /** Related amend */
  amend: IAmend
  /** User data */
  user: IUser | null
}
export const ArgumentModal = ({ amend, user }: IArgumentModalProps) => {
  return (
    <ModalContainer.Modal>
      <div className="modal-card" style={{ flex: 1, height: '100%' }}>
        <div className="modal-card-head">
          <p className="modal-card-title is-size-5">Détails de l'amendement</p>
          <ModalContainer.Modal.Close>
            <button className="delete" aria-label="close" />
          </ModalContainer.Modal.Close>
        </div>
        <div className="modal-card-body">
          <AmendEventCard user={user} target={amend} />
          <Divider content="Liste des arguments" />
          <ArgumentsList
            amendID={amend._id}
            args={React.useMemo(
              () => getListArgumentsWithPopularSorting(amend.arguments),
              [amend.arguments]
            )}
            hasNextPage={false}
          />
        </div>
        <div className="modal-card-foot">
          <EditArgument amendID={amend._id} />
        </div>
      </div>
    </ModalContainer.Modal>
  )
}
