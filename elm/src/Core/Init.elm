module Core.Init exposing (init)


import Core.Model exposing (Model)
import Translate.Utils exposing (LanguageTag(..))
import Browser.Navigation as Nav
import Core.Messages exposing (Msg)
import Url



init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( { key = key, url = url, language = EN } , Cmd.none )