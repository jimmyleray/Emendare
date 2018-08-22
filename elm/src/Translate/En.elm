module Translate.En exposing (enTranslations)

import Translate.Keys exposing (TranslationKey(..))

enTranslations : TranslationKey -> String
enTranslations key =
    case key of
        Hello ->
            "Hello"

        Welcome ->
            "Open source platform with advanced and democratic community management of amendable texts"