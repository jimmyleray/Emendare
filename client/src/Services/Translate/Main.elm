module Services.Translate.Main exposing (..)

import Services.Translate.En exposing (enTranslations)
import Services.Translate.Fr exposing (frTranslations)
import Services.Translate.Keys exposing (TranslationKey)



type LanguageTag
    = FR
    | EN



translate : LanguageTag -> TranslationKey -> String
translate languageTag translationKey =
    let
        translateFunction =
            case languageTag of
                FR -> frTranslations
                EN -> enTranslations
    in
    translateFunction translationKey



tagToString : LanguageTag -> String
tagToString languageTag =
    case languageTag of
        FR -> "FR"
        EN -> "EN"



stringToTag : String -> LanguageTag
stringToTag languageString =
    case languageString of
        "FR" -> FR
        "EN" -> EN
        _ -> EN