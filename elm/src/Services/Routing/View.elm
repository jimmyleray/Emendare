module Services.Routing.View exposing (routerView)

import Html exposing (Html)

import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)
import Services.Routing.Main exposing (Route(..), fromUrl)

import Pages.Home
import Pages.Readme



routerView : Model -> Html Msg
routerView model =
    let 
        route : Maybe Route
        route = 
            (fromUrl model.url)
    in
    case route of
        Just Root ->
            Pages.Home.view model

        Just Readme ->
            Pages.Readme.view model

        Nothing ->
            Pages.Home.view model