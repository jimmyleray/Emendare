import React from 'react'
import { Icon } from '../../../components'
import { Password, UiEffectInput } from '../../../services'

interface IPwdFormProps {
  change: any
  password: string
  checkPassword: string
  pwdValid: boolean
  pwdSame: boolean
  className?: string
}

const displayHelper = (
  isValid: boolean,
  inputValue: any,
  message: { true: string; false: string }
) => {
  if (inputValue) {
    if (isValid) {
      return <p className="help is-success">{message.true}</p>
    } else {
      return <p className="help is-danger">{message.false}</p>
    }
  }
  return null
}

export const PwdForm = ({
  password,
  pwdValid,
  change,
  pwdSame,
  checkPassword,
  className
}: IPwdFormProps) => {
  return (
    <React.Fragment>
      <div className="field">
        <div className="control has-icons-left has-icons-right">
          <input
            placeholder="Nouveau mot de passe"
            value={password}
            aria-label="password input"
            autoComplete="off"
            onChange={(event: any) =>
              change(
                'password',
                Password.isLengthPasswordValid(event.target.value)
              )(event)
            }
            className={
              `input ${className} ` + UiEffectInput.setColor(pwdValid, password)
            }
            type="password"
          />
          <Icon type="fas fa-lock" className="icon is-medium is-left" />
        </div>
        {displayHelper(pwdValid, password, {
          true: 'Mot de passe valide',
          false: 'Le mot de passe doit contenir au moins 8 charactères'
        })}
      </div>
      <div className="field">
        <div className="control has-icons-left has-icons-right">
          <input
            placeholder="Confirmez le nouveau mot de passe"
            aria-label="password verification input"
            value={checkPassword}
            autoComplete="off"
            onChange={(event: any) =>
              change(
                'checkPassword',
                Password.isSamePassword(password, event.target.value)
              )(event)
            }
            className={
              `input ${className} ` +
              UiEffectInput.setColor(pwdSame, checkPassword)
            }
            type="password"
          />
          <Icon type="fas fa-lock" className="icon is-medium is-left" />
        </div>
        {displayHelper(pwdSame, checkPassword, {
          true: 'Mot de passe valide',
          false: 'Les mots de passe ne sont pas les mêmes'
        })}
      </div>
    </React.Fragment>
  )
}
