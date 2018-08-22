module Translate.Fr exposing (frTranslations)

import Translate.Keys exposing (TranslationKey(..))


frTranslations : TranslationKey -> String
frTranslations key =
    case key of
        Hello ->
            "Bonjour"

        Welcome ->
            "Plateforme open source avec une gestion communautaire avancée et démocratique de textes amendables"