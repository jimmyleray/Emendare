module Views.Body exposing (viewBody)

import Core.Messages exposing (Msg)
import Core.Model exposing (Model)
import Html exposing (Html, div)
import Views.Navbar exposing (viewNavbar)
import Views.Page exposing (viewPage)


viewBody : Model -> Html Msg
viewBody model =
    div []
        [ viewNavbar model
        , viewPage model
        ]
