module Core.Model exposing (Model)

import Translate.Utils exposing (LanguageTag)

type alias Model = {
    language : LanguageTag
}