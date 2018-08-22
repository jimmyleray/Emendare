module Views.TranslateDrop exposing (translateDrop)

import Core.Messages exposing (..)
import Core.Model exposing (Model)
import Html exposing (Html, a, div, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Translate.Utils exposing (LanguageTag(..))


translateDrop : Model -> Html Msg
translateDrop model =
    div [ class "navbar-item has-dropdown is-hoverable" ]
        [ a [ class "navbar-link" ] [ text <| toString model.language ]
        , div [ class "navbar-dropdown is-right" ]
            [ a [ class "navbar-item", onClick <| ChangeLanguage FR ] [ text "Français" ]
            , a [ class "navbar-item", onClick <| ChangeLanguage EN ] [ text "English" ]
            ]
        ]
