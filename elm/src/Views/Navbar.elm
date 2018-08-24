module Views.Navbar exposing (viewNavbar)

import Core.Messages exposing (Msg)
import Core.Model exposing (Model)
import Html exposing (Html, a, div, nav, text)
import Html.Attributes exposing (attribute, class)
import Views.IconLink exposing (viewIconLink)
import Views.TranslateDrop exposing (viewTranslateDrop)


viewNavbar : Model -> Html Msg
viewNavbar model =
    nav [ attribute "aria-label" "main navigation", class "navbar is-info is-fixed-top is-transparent", attribute "role" "navigation" ]
        [ div [ class "navbar-brand" ]
            [ div [ class "navbar-item" ]
                [ text "Emendare" ]
            ]
        , div [ class "navbar-end" ]
            [ viewIconLink "https://github.com/JimmyLeray/Emendare" "fab fa-github" "GitHub" model
            , viewIconLink "https://emendare-documentation.cleverapps.io/" "fas fa-book" "Documentation" model
            , viewTranslateDrop model
            ]
        ]
