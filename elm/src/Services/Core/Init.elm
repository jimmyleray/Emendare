module Services.Core.Init exposing (init)

import Browser.Navigation exposing (Key)
import Url exposing (Url)

import Services.Core.Model exposing (Model)
import Services.Translate.Main exposing (LanguageTag(..))
import Services.Core.Messages exposing (Msg)



init : () -> Url -> Key -> ( Model, Cmd Msg )
init flags url key =
    ( { key = key, url = url, language = EN } , Cmd.none )