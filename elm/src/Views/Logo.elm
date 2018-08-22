module Views.Logo exposing (logo)

import Core.Messages exposing (..)
import Core.Model exposing (Model)

import Html exposing (Html, img)
import Html.Attributes exposing (src)


logo : Model -> String -> Html Msg
logo model color = 
    img [ src <| "/img/logo/logo-" ++ color ++ ".svg" ] []