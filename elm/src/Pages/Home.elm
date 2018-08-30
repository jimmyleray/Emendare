module Pages.Home exposing (view)

import Html exposing (Html, section, div, h1, h2, text)
import Html.Attributes exposing (class) 

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Translate.Main exposing (translate)
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)



view : Model -> Html Msg
view model =
    section [ class "hero is-dark" ]
            [ div [ class "hero-body" ]
                [ div [ class "container" ]
                    [ h1 [ class "title" ] [ text "Emendare" ]
                    , h2 [ class "subtitle" ] [ text <| translate model.language Welcome ]
                    ]
                ]
            ]