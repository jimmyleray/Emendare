module Views.Body exposing (body)

import Html exposing (Html, div)
import Views.Page exposing (page)
import Views.Navbar exposing (navbar)
import Core.Messages exposing (Msg)
import Core.Model exposing (Model)

body : Model -> Html Msg
body model = div []
    [ navbar model
    , page model
    ]