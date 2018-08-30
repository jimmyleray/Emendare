module Components.Body exposing (view)

import Html exposing (Html, div)
import Services.Routing.View exposing (routerView)

import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)

import Components.Navbar



view : Model -> Html Msg
view model =
    div []
        [ Components.Navbar.view model
        , routerView model
        ]