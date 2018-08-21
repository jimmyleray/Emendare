module Views.TranslateDropdown exposing (translateDropdown)

import Core.Messages exposing (..)
import Core.Model exposing (Model)

import Html exposing (Html, div, a, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)

import Translate.Utils exposing (LanguageTag(..))


translateDropdown : Model -> Html Msg
translateDropdown model =
    div [ class "navbar-item has-dropdown is-hoverable" ]
    [ a [ class "navbar-link" ] [ text <| toString model.language ]
    , div [ class "navbar-dropdown" ]
        [ a [ class "navbar-item", onClick <| ChangeLanguage FR ] [ text "FR" ]
        , a [ class "navbar-item", onClick <| ChangeLanguage EN ] [ text "EN" ]
        ]
    ]