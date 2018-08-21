module Views.Navbar exposing (navbar)

import Core.Messages exposing (..)
import Core.Model exposing (Model)

import Views.TranslateDropdown exposing (translateDropdown)
import Views.GitHubLink exposing (gitHubLink)
import Views.DocLink exposing (docLink)

import Html exposing (Html, div, a, text, nav)
import Html.Attributes exposing (class, attribute)


navbar : Model -> Html Msg
navbar model = 
    nav [ attribute "aria-label" "main navigation", class "navbar container is-fixed-top is-transparent", attribute "role" "navigation" ]
        [ div [ class "navbar-brand" ]
            [ div [ class "navbar-item" ]
                [ text "Emendare" ]
            ],
            div [ class "navbar-end" ]
                [ 
                    gitHubLink model, 
                    docLink model,
                    translateDropdown model 
                ]
        ]