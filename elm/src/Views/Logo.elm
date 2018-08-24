module Views.Logo exposing (viewLogo)

import Core.Messages exposing (Msg)
import Core.Model exposing (Model)
import Html exposing (Html, img)
import Html.Attributes exposing (src)


viewLogo : Model -> String -> Html Msg
viewLogo model color =
    img [ src <| "/img/logo/logo-" ++ color ++ ".svg" ] []
