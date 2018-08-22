module Views.Navbar exposing (navbar)

import Core.Messages exposing (Msg)
import Core.Model exposing (Model)
import Html exposing (Html, a, div, nav, text)
import Html.Attributes exposing (attribute, class)
import Views.IconLink exposing (iconLink)
import Views.TranslateDrop exposing (translateDrop)


navbar : Model -> Html Msg
navbar model =
    nav [ attribute "aria-label" "main navigation", class "navbar container is-fixed-top is-transparent", attribute "role" "navigation" ]
        [ div [ class "navbar-brand" ]
            [ div [ class "navbar-item" ]
                [ text "Emendare" ]
            ]
        , div [ class "navbar-end" ]
            [ iconLink "https://github.com/JimmyLeray/Emendare" "fab fa-github" "GitHub" model
            , iconLink "https://emendare-documentation.cleverapps.io/" "fas fa-book" "Documentation" model
            , translateDrop model
            ]
        ]
