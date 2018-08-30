module Services.Translate.Main exposing (LanguageTag(..), translate, tagToString)

import Services.Translate.En exposing (enTranslations)
import Services.Translate.Fr exposing (frTranslations)
import Services.Translate.Keys exposing (TranslationKey)



type LanguageTag
    = FR
    | EN



translate : LanguageTag -> TranslationKey -> String
translate languageTag translationKey =
    let
        translateFun =
            case languageTag of
                FR ->
                    frTranslations

                EN ->
                    enTranslations
    in
    translateFun translationKey



tagToString : LanguageTag -> String
tagToString languageTag =
    case languageTag of
        FR ->
            "FR"

        EN ->
            "EN"