module Core.Init exposing (init)


import Core.Model exposing (Model)
import Services.Translate.Main exposing (LanguageTag(..))
import Browser.Navigation exposing (Key)
import Core.Messages exposing (Msg)
import Url exposing (Url)



init : () -> Url -> Key -> ( Model, Cmd Msg )
init flags url key =
    ( { key = key, url = url, language = EN } , Cmd.none )