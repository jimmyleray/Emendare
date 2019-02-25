import React from 'react'

interface Ii18nProviderProps {
  children: React.ReactNode
}

interface Ii18nProviderState {
  locale: string
  languages: string[]
  setLocaleWithStorage: (value: string) => void
}

const languages = ['EN', 'FR']

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
  if (languages.indexOf(initialLanguage) === -1) {
    initialLanguage = 'EN'
  }

  localStorage.setItem('language', initialLanguage)
  const [locale, setLocale] = React.useState(initialLanguage)

  const setLocaleWithStorage = (value: string) => {
    localStorage.setItem('language', value)
    setLocale(value)
  }

  return (
    <I18nContext.Provider value={{ languages, locale, setLocaleWithStorage }}>
      {children}
    </I18nContext.Provider>
  )
}
