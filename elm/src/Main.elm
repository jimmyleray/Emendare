module Main exposing (main)

import Browser exposing (application)

import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg(..))
import Services.Core.Init exposing (init)
import Services.Core.Update exposing (update)
import Services.Core.Subscriptions exposing (subscriptions)
import Services.Core.View exposing (view)



main : Program () Model Msg
main =
    application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }