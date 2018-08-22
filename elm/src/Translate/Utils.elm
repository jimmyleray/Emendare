module Translate.Utils exposing (parseLanguage, translate, LanguageTag(..))

import Translate.Keys exposing (TranslationKey)
import Translate.En exposing (enTranslations)
import Translate.Fr exposing (frTranslations)

type LanguageTag
    = FR
    | EN

parseLanguage : String -> LanguageTag
parseLanguage tag =
    case tag of
        "FR" ->
            FR

        "EN" ->
            EN

        _ ->
            Debug.log
                ("Unknown language: '" ++ tag ++ "', defaulting to English")
                EN

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