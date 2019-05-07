import React from 'react'
import {
  ModalContainer,
  EditArgument,
  Button,
  ArgumentsList,
  Divider,
  AmendEventCard
} from '../../../components'
import { IAmend, IUser } from '../../../../../interfaces'

interface IArgumentModalProps {
  /** Related amend */
  amend: IAmend
  /** User data */
  user: IUser | null
}
export const ArgumentModal = ({ amend, user }: IArgumentModalProps) => {
  return (
    <ModalContainer.Modal>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Arguments</p>
          <ModalContainer.Modal.Close>
            <Button className="modal-close is-large" />
          </ModalContainer.Modal.Close>
        </header>
        <section className="modal-card-body">
          <AmendEventCard user={user} target={amend} />
          <Divider content="Liste des arguments" />
          <ArgumentsList
            amendID={amend._id}
            args={amend.arguments}
            hasNextPage={false}
          />
        </section>
        <footer className="modal-card-foot">
          <EditArgument amendID={amend._id} />
        </footer>
      </div>
    </ModalContainer.Modal>
  )
}
