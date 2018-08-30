module Services.Core.Model exposing (Model)

import Browser.Navigation exposing (Key)
import Url exposing (Url)

import Services.Translate.Main exposing (LanguageTag)



type alias Model =
    { key : Key
    , url : Url
    , language : LanguageTag
    }