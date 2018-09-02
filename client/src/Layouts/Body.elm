module Layouts.Body exposing (view)

import Html exposing (Html, div)
import Services.Routing.View exposing (routerView)

import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)

import Elements.Navbar



view : Model -> Html Msg
view model =
    div []
        [ Elements.Navbar.view model
        , routerView model
        ]