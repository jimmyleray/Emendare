module Core.View exposing (view)

import Browser exposing (Document)

import Services.Routing.Main exposing (Route(..), fromUrl)
import Core.Model exposing (Model)
import Core.Messages exposing (Msg)

import Pages.Home
import Pages.Readme



view : Model -> Document Msg
view model = viewRouter (fromUrl model.url) model



viewRouter : Maybe Route -> Model -> Document Msg
viewRouter route model =
    case route of
        Just Root ->
            Pages.Home.view model

        Just Readme ->
            Pages.Readme.view model

        Nothing ->
            Pages.Home.view model