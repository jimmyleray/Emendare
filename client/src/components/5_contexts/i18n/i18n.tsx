import React from 'react'
import { translations, translateKey, language } from '../../../config'

interface Ii18nProviderProps {
  children: React.ReactNode
}

interface Ii18nProviderState {
  locale: string
  availableLanguages: language[]
  setLocaleWithStorage: (value: language) => void
  translate: (key: translateKey) => string
}

const availableLanguages: language[] = ['EN', 'FR']

const getNavigatorLanguage = () =>
  navigator.language
    ? navigator.language.indexOf('-') > -1
      ? navigator.language.split('-')[0].toUpperCase()
      : navigator.language.toUpperCase()
    : 'EN'

const getInitialLanguage = (): language =>
  (localStorage.getItem('language') as language) ||
  getNavigatorLanguage() ||
  'EN'

export const I18nContext = React.createContext({} as Ii18nProviderState)

export const I18nProvider = ({ children }: Ii18nProviderProps) => {
  let initialLanguage = getInitialLanguage()
  if (availableLanguages.indexOf(initialLanguage as language) === -1) {
    initialLanguage = 'EN'
  }

  localStorage.setItem('language', initialLanguage)
  const [locale, setLocale] = React.useState<language>(initialLanguage)

  const setLocaleWithStorage = (value: language) => {
    localStorage.setItem('language', value)
    setLocale(value)
  }

  const translate = (key: translateKey) =>
    translations[key]
      ? translations[key][locale] ||
        translations[key].EN ||
        translations[key].FR ||
        key
      : key

  return (
    <I18nContext.Provider
      value={{ availableLanguages, locale, setLocaleWithStorage, translate }}
    >
      {children}
    </I18nContext.Provider>
  )
}
