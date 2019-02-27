import React from 'react'
import { Input } from '../../../components'
import { Password, UiEffectInput } from '../../../services'

interface IPwdFormProps {
  /** Function to handle onChange event */
  change: any
  /** The current value of the first input */
  password: string
  /** The current value of the second input */
  checkPassword: string
  /** True if the password repect the rules you set */
  pwdValid: boolean
  /** True if the password and the verification password are the same */
  pwdSame: boolean
  /** Additional CSS UI class */
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
          <Input
            placeholder="Nouveau mot de passe"
            value={password}
            ariaLabel="password input"
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
            iconLeft="fas fa-lock"
          />
        </div>
        {displayHelper(pwdValid, password, {
          true: 'Mot de passe valide',
          false: 'Le mot de passe doit contenir au moins 8 charactères'
        })}
      </div>
      <div className="field">
        <div className="control has-icons-left has-icons-right">
          <Input
            placeholder="Verification du mot de passe"
            ariaLabel="password verification input"
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
            iconLeft="fas fa-lock"
          />
        </div>
        {displayHelper(pwdSame, checkPassword, {
          true: 'Mot de passe valide',
          false: 'Les mots de passe ne sont pas les mêmes'
        })}
      </div>
    </React.Fragment>
  )
}
