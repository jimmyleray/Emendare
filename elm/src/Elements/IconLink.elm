module Elements.IconLink exposing (view)

import Html exposing (Html, a, span, i)
import Html.Attributes exposing (class, href, title)

import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)



view : String -> String -> String -> Model -> Html Msg
view link icon desc model =
    a [ class "navbar-item", href link, title desc ]
        [ span [ class "icon is-medium" ]
            [ i [ class icon ] [] ]
        ]