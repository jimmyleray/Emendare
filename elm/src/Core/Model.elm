module Core.Model exposing (Model)

import Translate.Utils exposing (LanguageTag)
import Browser.Navigation as Nav
import Url



type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , language : LanguageTag
    }