module Main exposing (main)

import Browser

import Core.Model exposing (Model)
import Core.Messages exposing (Msg(..))
import Core.Init exposing (init)
import Core.Update exposing (update)
import Core.Subscriptions exposing (subscriptions)
import Core.View exposing (view)



main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }