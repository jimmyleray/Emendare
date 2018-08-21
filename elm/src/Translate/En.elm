module Translate.En exposing (enTranslations)

import Translate.Keys exposing (TranslationKey(..))


enTranslations : TranslationKey -> String
enTranslations key =
    case key of
        Hello ->
            "Hello"

        Welcome ->
            "Welcome"