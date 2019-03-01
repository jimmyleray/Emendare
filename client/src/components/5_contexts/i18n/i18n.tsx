import React from 'react'
import { translations, translateKey, language } from '../../../config'

interface Ii18nProviderProps {
  children: React.ReactNode
}

interface Ii18nStoreState {
  readonly actualLanguage: language
  readonly availableLanguages: string[]
  readonly translate: (key: translateKey) => string
}

interface Ii18nProviderState extends Ii18nStoreState {
  readonly dispatch: React.Dispatch<Ii18nStoreAction>
}

interface Ii18nStoreAction {
  readonly type: 'setLanguage' | 'toggleLanguage'
  readonly payload?: any
}

const availableLanguages = Object.keys(language)
const defaultLanguage = language.EN

const translate = (lang: language) => (key: translateKey) =>
  translations[key] ? translations[key][lang] || key : key

const getNavigatorLanguage = () =>
  navigator.language
    ? navigator.language.indexOf('-') > -1
      ? navigator.language.split('-')[0].toUpperCase()
      : navigator.language.toUpperCase()
    : defaultLanguage

const getInitialLanguage = (): language => {
  let lang =
    (localStorage.getItem('language') as language) ||
    getNavigatorLanguage() ||
    defaultLanguage

  // Verify if the browser language is available in Emendare
  if (availableLanguages.indexOf(lang as language) === -1) {
    lang = defaultLanguage
  }

  return lang
}

const actualLanguage = getInitialLanguage()

const initialState = {
  availableLanguages,
  actualLanguage,
  translate: translate(actualLanguage)
}

const reducer = (state: Ii18nStoreState, action: Ii18nStoreAction) => {
  switch (action.type) {
    case 'setLanguage':
      localStorage.setItem('language', action.payload)
      return {
        ...state,
        actualLanguage: action.payload,
        translate: translate(action.payload)
      }
    case 'toggleLanguage':
      const newLanguage =
        state.actualLanguage === language.EN ? language.FR : language.EN
      localStorage.setItem('language', newLanguage)
      return {
        ...state,
        actualLanguage: newLanguage,
        translate: translate(newLanguage)
      }
    default:
      return { ...state }
  }
}

export const I18nContext = React.createContext({} as Ii18nProviderState)

export const I18nProvider = ({ children }: Ii18nProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <I18nContext.Provider value={{ dispatch, ...state }}>
      {children}
    </I18nContext.Provider>
  )
}
