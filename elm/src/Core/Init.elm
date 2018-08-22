module Core.Init exposing (init)

import Core.Messages exposing (..)
import Core.Model exposing (Model)
import Translate.Utils exposing (LanguageTag(..))


init : ( Model, Cmd Msg )
init =
    ( { language = EN }, Cmd.none )
