module Core.Init exposing (init)

import Translate.Utils exposing (LanguageTag(..))

import Core.Messages exposing (..)
import Core.Model exposing (Model)


init : ( Model, Cmd Msg )
init = ( { language = EN }, Cmd.none )