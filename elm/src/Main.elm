module Main exposing (..)

import Html exposing (Html, text, div, nav,h1, h2, section, img)
import Html.Attributes exposing (class, attribute, src)

---- MODEL ----

type alias Model = {}

init : ( Model, Cmd Msg )
init = ( {}, Cmd.none )



---- UPDATE ----

type Msg = NoOp

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



---- VIEW ----

view : Model -> Html Msg
view model = layout model

layout : Model -> Html Msg
layout model = div []
    [ navbar model
    , content model
    ]

navbar : Model -> Html Msg
navbar model = 
    nav [ attribute "aria-label" "main navigation", class "navbar is-fixed-top", attribute "role" "navigation" ]
        [ div [ class "navbar-brand" ]
            [ div [ class "navbar-item" ]
                [ text "Emendare" ]
            ]
        ]

content : Model -> Html Msg
content model =
    section [ class "hero is-primary" ]
            [ div [ class "hero-body" ]
                [ div [ class "container" ]
                    [ logo model "white",
                        h1 [ class "title" ]
                        [ text "Emendare" ]
                    , h2 [ class "subtitle" ]
                        [ text "Open source platform with advanced and democratic community management of amendable texts" ]
                    ]
                ]
            ]

logo : Model -> String -> Html Msg
logo model color =
    img [ src <| "/img/logo/logo-" ++ color ++ ".svg" ]
        []

---- PROGRAM ----

main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }
