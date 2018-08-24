module Views.IconLink exposing (viewIconLink)

import Core.Messages exposing (Msg)
import Core.Model exposing (Model)
import Html exposing (Html, a, i, span)
import Html.Attributes exposing (attribute, class, href, title)


viewIconLink : String -> String -> String -> Model -> Html Msg
viewIconLink link icon desc model =
    a [ class "navbar-item", href link, title desc ]
        [ span [ class "icon is-medium" ]
            [ i [ class icon ]
                []
            ]
        ]
