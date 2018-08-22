module Core.Update exposing (update)

import Core.Messages exposing (..)
import Core.Model exposing (Model)

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ChangeLanguage payload ->
            ( { model | language = payload }, Cmd.none )