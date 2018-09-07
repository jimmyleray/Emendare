module Services.Core.Init exposing (init)

import Browser.Navigation exposing (Key)
import Url exposing (Url)

import Services.Core.Model exposing (Model)
import Services.Translate.Main exposing (LanguageTag(..), stringToTag)
import Services.Core.Messages exposing (Msg)
import Services.Core.Flags exposing (Flags)
import Services.Routing.Routes exposing (Route(..))



init : Flags -> Url -> Key -> ( Model, Cmd Msg )
init flags url key =
    ( { key = key
    , url = url
    , language = stringToTag flags.language
    , isAuthentified = False
    , userName = ""
    }, Cmd.none )