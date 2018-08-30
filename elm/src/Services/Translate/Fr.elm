module Services.Translate.Fr exposing (frTranslations)

import Services.Translate.Keys exposing (TranslationKey(..))


frTranslations : TranslationKey -> String
frTranslations key =
    case key of
        Welcome ->
            "Plateforme open source avec une gestion communautaire avancée et démocratique de textes amendables"
