module Services.Core.Init exposing (init)

import Browser.Navigation exposing (Key)
import Url exposing (Url)

import Services.Core.Model exposing (Model)
import Services.Translate.Main exposing (LanguageTag(..), stringToTag)
import Services.Core.Messages exposing (Msg)
import Services.Core.Flags exposing (Flags)
import Services.Routing.Guard exposing (redirectIfProtected)
import Services.Routing.Main exposing (fromUrl)



initialModel : Flags -> Url -> Key -> Model
initialModel flags url key =
    { key = key
    , url = url
    , language = stringToTag flags.language
    , isAuthentified = False
    , userName = ""
    }



init : Flags -> Url -> Key -> ( Model, Cmd Msg )
init flags url key =
    ( initialModel flags url key
    , redirectIfProtected (fromUrl url) <| initialModel flags url key
    )