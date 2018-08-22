module Views.Page exposing (page)

import Core.Messages exposing (..)
import Core.Model exposing (Model)
import Html exposing (Html, a, div, h1, h2, section, span, text)
import Html.Attributes exposing (class)
import Translate.Keys exposing (..)
import Translate.Utils exposing (translate)
import Views.Logo exposing (logo)


page : Model -> Html Msg
page model =
    section [ class "hero is-dark" ]
        [ div [ class "hero-body" ]
            [ div [ class "container" ]
                [ logo model "white"
                , h1 [ class "title" ] [ text "Emendare" ]
                , h2 [ class "subtitle" ] [ text <| translate model.language Welcome ]
                ]
            ]
        ]
