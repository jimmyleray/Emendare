module Views.Body exposing (body)

import Core.Messages exposing (Msg)
import Core.Model exposing (Model)
import Html exposing (Html, div)
import Views.Navbar exposing (navbar)
import Views.Page exposing (page)


body : Model -> Html Msg
body model =
    div []
        [ navbar model
        , page model
        ]
