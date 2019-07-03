import React, { useState, useCallback } from 'react'
// Components
import { Icon, Notification, PwdForm, useUser } from '../../../components'
import { IError } from '../../../../../interfaces'

interface ISubscribeFormProps {
  /** render props of the submit buttons */
  render: any
  /** Function to handle inputs change */
  change: any
  /** Submit function */
  submit: any
  /** Value of the email */
  email: string
  /** Value of the password */
  password: string
  /** Value of the checking password */
  checkPassword: string
  /** True if the password is valid according to the rules */
  pwdValid: boolean
  /** True if the password and checkPassword are the same */
  pwdSame: boolean
  /** Error */
  error: IError | null
  /** True if the user has submited */
  send: boolean
}

export const SubscribeForm = ({
  render,
  change,
  submit,
  email,
  password,
  checkPassword,
  pwdSame,
  pwdValid,
  send,
  error
}: ISubscribeFormProps) => {
  return (
    <form onSubmit={submit} style={{ width: '100%' }}>
      {!send && (
        <React.Fragment>
          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <input
                autoFocus={true}
                placeholder="Email"
                value={email}
                onChange={change('email')}
                className="input"
                type="email"
                aria-label="email input"
              />
              <Icon name="fa-envelope" className="is-medium is-left" />
            </div>
          </div>
          <PwdForm
            change={change}
            password={password}
            checkPassword={checkPassword}
            pwdSame={pwdSame}
            pwdValid={pwdValid}
          />
          <div className="has-text-centered">
            {render(email, password, checkPassword, pwdValid, pwdSame)}
          </div>

          {error && (
            <React.Fragment>
              <br />
              <Notification className="is-danger has-text-centered">
                {error.message}
              </Notification>
            </React.Fragment>
          )}
        </React.Fragment>
      )}

      {send && (
        <Notification className="is-success has-text-centered">
          Vous allez recevoir dans quelques instants un email avec un lien pour
          activer votre compte. Pensez le cas échéant à vérifier vos spams.
        </Notification>
      )}
    </form>
  )
}
