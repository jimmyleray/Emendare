module Views.TranslateDrop exposing (translateDrop)

import Core.Messages exposing (..)
import Core.Model exposing (Model)

import Html exposing (Html, div, a, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)

import Translate.Utils exposing (LanguageTag(..))


translateDrop : Model -> Html Msg
translateDrop model =
    div [ class "navbar-item has-dropdown is-hoverable" ]
        [ a [ class "navbar-link" ] [ text <| toString model.language ]
            , div [ class "navbar-dropdown" ]
                [ a [ class "navbar-item", onClick <| ChangeLanguage FR ] [ text <| toString FR ]
                , a [ class "navbar-item", onClick <| ChangeLanguage EN ] [ text <| toString EN ]
                ]
        ]