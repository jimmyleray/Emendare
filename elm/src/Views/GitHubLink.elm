module Views.GitHubLink exposing (gitHubLink)

import Core.Messages exposing (..)
import Core.Model exposing (Model)

import Html exposing (Html, a, span, i)
import Html.Attributes exposing (class, attribute, href, title)


gitHubLink : Model -> Html Msg
gitHubLink model =
    a [ class "navbar-item", href "https://github.com/JimmyLeray/Emendare", title "GitHub" ]
        [ span [ class "icon is-medium" ]
            [ i [ class "fab fa-github" ]
                []
            ]
        ]