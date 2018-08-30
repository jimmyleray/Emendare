module Core.Model exposing (Model)

import Services.Translate.Main exposing (LanguageTag)
import Browser.Navigation exposing (Key)
import Url exposing (Url)



type alias Model =
    { key : Key
    , url : Url
    , language : LanguageTag
    }