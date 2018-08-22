module Main exposing (main)

import Html exposing (Html)
import Core.Init exposing (init)
import Core.Update exposing (update)
import Core.View exposing (view)
import Core.Messages exposing (Msg)
import Core.Model exposing (Model)

main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }
