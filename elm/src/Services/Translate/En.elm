module Services.Translate.En exposing (enTranslations)

import Services.Translate.Keys exposing (TranslationKey(..))


enTranslations : TranslationKey -> String
enTranslations key =
    case key of
        Welcome ->
            "Open source platform with advanced and democratic community management of amendable texts"
