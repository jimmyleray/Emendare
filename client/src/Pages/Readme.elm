module Pages.Readme exposing (view)

import Html exposing (Html, section, div, h1, h2, text)
import Html.Attributes exposing (class) 

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Translate.Main exposing (translate)
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)



view : Model -> Html Msg
view model =
    section [ class "hero is-light is-fullheight" ]
            [ div [ class "hero-body has-text-centered" ]
                [ div [ class "container" ]
                    [ h1 [ class "title" ] [ text <| translate model.language ReadmeTitle ] ]
                ]
            ]
