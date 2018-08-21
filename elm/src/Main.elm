module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

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
    nav [ attribute "aria-label" "main navigation", class "navbar container is-fixed-top is-transparent", attribute "role" "navigation" ]
        [ div [ class "navbar-brand" ]
            [ div [ class "navbar-item" ]
                [ text "Emendare" ]
            ],
            div [ class "navbar-end" ]
                [ gitHubLink model, docLink model ]
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

gitHubLink : Model -> Html Msg
gitHubLink model =
    a [ class "navbar-item", href "https://github.com/JimmyLeray/Emendare", title "GitHub" ]
        [ span [ class "icon is-medium" ]
            [ i [ class "fab fa-github" ]
                []
            ]
        ]

docLink : Model -> Html Msg
docLink model =
    a [ class "navbar-item", href "https://emendare-documentation.cleverapps.io/", title "Documentation" ]
        [ span [ class "icon is-medium" ]
            [ i [ class "fas fa-book" ]
                []
            ]
        ]

---- PROGRAM ----

main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }
