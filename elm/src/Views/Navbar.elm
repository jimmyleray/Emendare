module Views.Navbar exposing (navbar)

import Core.Messages exposing (..)
import Core.Model exposing (Model)

import Views.TranslateDrop exposing (translateDrop)
import Views.IconLink exposing (iconLink)

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
                    iconLink "https://github.com/JimmyLeray/Emendare" "fab fa-github" "GitHub" model, 
                    iconLink "https://emendare-documentation.cleverapps.io/" "fas fa-book" "Documentation" model,
                    translateDrop model 
                ]
        ]