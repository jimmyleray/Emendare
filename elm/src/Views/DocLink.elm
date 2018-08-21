module Views.DocLink exposing (docLink)

import Core.Messages exposing (..)
import Core.Model exposing (Model)

import Html exposing (Html, a, span, i)
import Html.Attributes exposing (class, attribute, href, title)


docLink : Model -> Html Msg
docLink model =
    a [ class "navbar-item", href "https://emendare-documentation.cleverapps.io/", title "Documentation" ]
        [ span [ class "icon is-medium" ]
            [ i [ class "fas fa-book" ]
                []
            ]
        ]