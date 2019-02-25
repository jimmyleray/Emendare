import React from 'react'
import { translations, translateKey, languages } from '../../../config'

interface Ii18nProviderProps {
  children: React.ReactNode
}

interface Ii18nProviderState {
  locale: string
  availableLanguages: languages[]
  setLocaleWithStorage: (value: string) => void
  translate: (key: translateKey) => string
}

const availableLanguages: languages[] = ['EN', 'FR']

const getNavigatorLanguage = () =>
  navigator.language
    ? navigator.language.indexOf('-') > -1
      ? navigator.language.split('-')[0].toUpperCase()
      : navigator.language.toUpperCase()
    : 'EN'

const getInitialLanguage = () =>
  localStorage.getItem('language') || getNavigatorLanguage() || 'EN'

export const I18nContext = React.createContext({} as Ii18nProviderState)

export const I18nProvider = ({ children }: Ii18nProviderProps) => {
  let initialLanguage = getInitialLanguage()
  if (availableLanguages.indexOf(initialLanguage as languages) === -1) {
    initialLanguage = 'EN'
  }

  localStorage.setItem('language', initialLanguage)
  const [locale, setLocale] = React.useState(initialLanguage)

  const setLocaleWithStorage = (value: string) => {
    localStorage.setItem('language', value)
    setLocale(value)
  }

  const translate = (key: translateKey) =>
    translations[key][locale] || translations[key].EN || translations[key].FR

  return (
    <I18nContext.Provider
      value={{ availableLanguages, locale, setLocaleWithStorage, translate }}
    >
      {children}
    </I18nContext.Provider>
  )
}
