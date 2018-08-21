module Core.View exposing (view)

import Html exposing (Html, div)

import Views.Page exposing (page)
import Views.Navbar exposing (navbar)

import Core.Messages exposing (..)
import Core.Model exposing (Model)


view : Model -> Html Msg
view model = div []
    [ navbar model
    , page model
    ]