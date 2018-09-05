module Pages.Profile exposing (view)

import Html exposing (Html, section, button, div, h1, h2, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Translate.Main exposing (translate)
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg(..))



view : Model -> Html Msg
view model =
    section [ class "hero is-light is-fullheight" ]
            [ div [ class "hero-body has-text-centered" ]
                [ div [ class "container" ]
                    [ h1 [ class "title" ] [ text <| translate model.language ProfileTitle ]
                    , button [ class "button is-medium is-danger", onClick Disconnect ]
                        [ text <| translate model.language Log_out ]
                    ]
                ]
            ]
