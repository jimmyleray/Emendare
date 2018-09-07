module Pages.SignUp exposing (view)

import Html exposing (..)
import Html.Attributes exposing (class, type_, placeholder, autocomplete)
import Html.Events exposing (onClick)

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Translate.Main exposing (translate)
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg(..))



view : Model -> Html Msg
view model =
    section [ class "hero is-light is-fullheight" ]
            [ div [ class "hero-body" ]
                [ div [ class "container" ]
                    [ h1 [ class "title has-text-centered" ] [ text <| translate model.language SignUpTitle ]
                    , div [ class "box max-width-350" ]
                        [ div [ class "field" ]
                            [ label [ class "label is-medium" ]
                                [ text "Email" ]
                            , div [ class "control has-icons-left" ]
                                [ input [ class "input", type_ "email", placeholder "Email", autocomplete True ] []
                                , span [ class "icon is-medium is-left" ]
                                    [ i [ class "fas fa-envelope" ] [] ]
                                ]
                            ]
                        , div [ class "field" ]
                            [ label [ class "label is-medium" ]
                                [ text "Password" ]
                            , div [ class "control has-icons-left" ]
                                [ input [ class "input", type_ "password", placeholder "Password", autocomplete True ] []
                                , span [ class "icon is-medium is-left" ]
                                    [ i [ class "fas fa-lock" ] [] ]
                                ]
                            ]
                        , div [ class "control has-text-right" ]
                            [ button [ class "button is-medium is-primary", onClick Connect ]
                                [ text <| translate model.language SignUpTitle ]
                            ]
                        ]
                    ]
                ]
            ]
