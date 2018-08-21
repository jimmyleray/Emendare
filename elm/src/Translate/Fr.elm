module Translate.Fr exposing (frTranslations)

import Translate.Keys exposing (TranslationKey(..))


frTranslations : TranslationKey -> String
frTranslations key =
    case key of
        Hello ->
            "Bonjour"

        Welcome ->
            "Bienvenue"