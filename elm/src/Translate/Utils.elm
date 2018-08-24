module Translate.Utils exposing (LanguageTag(..), translate)

import Translate.En exposing (enTranslations)
import Translate.Fr exposing (frTranslations)
import Translate.Keys exposing (TranslationKey)


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
