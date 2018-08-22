module Views.Page exposing (page)

import Core.Messages exposing (..)
import Core.Model exposing (Model)

import Html exposing (Html, section, a, div, span, text, h1, h2)
import Html.Attributes exposing (class)

import Views.Logo exposing (logo)

import Translate.Utils exposing (translate)
import Translate.Keys exposing (..)


page : Model -> Html Msg
page model =
    section [ class "hero is-primary" ]
        [ div [ class "hero-body" ]
            [ div [ class "container" ]
                [ logo model "white",
                    h1 [ class "title" ] [ text "Emendare" ]
                    , h2 [ class "subtitle" ] [ text "Open source platform with advanced and democratic community management of amendable texts" ]
                    , span [] [ text <| translate model.language Hello]
                ]
            ]
        ]