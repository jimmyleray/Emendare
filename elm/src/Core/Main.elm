module Main exposing (main)

import Core.Init exposing (init)
import Core.Messages exposing (Msg)
import Core.Model exposing (Model)
import Core.Update exposing (update)
import Core.View exposing (view)
import Html exposing (Html)


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }
