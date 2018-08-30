module Pages.Home exposing (view)

import Browser exposing (Document)
import Html exposing (Html, section, div, h1, h2, text)
import Html.Events exposing (onClick)
import Html.Attributes exposing (class) 

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Translate.Main exposing (translate)

import Core.Model exposing (Model)
import Core.Messages exposing (Msg)
import Views.Navbar



view : Model -> Document Msg
view model =
    { title = "Emendare | Home"
    , body =
        [ Views.Navbar.view model
        , section [ class "hero is-dark" ]
            [ div [ class "hero-body" ]
                [ div [ class "container" ]
                    [ h1 [ class "title" ] [ text "Emendare" ]
                    , h2 [ class "subtitle" ] [ text <| translate model.language Welcome ]
                    ]
                ]
            ]
        ]
    }