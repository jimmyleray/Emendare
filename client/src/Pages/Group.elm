module Pages.Group exposing (view)

import Html exposing (Html, section, div, h1, text)
import Html.Attributes exposing (class) 

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Translate.Main exposing (translate)
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)



view : Model -> String -> Html Msg
view model id =
    section [ class "hero is-light is-fullheight" ]
            [ div [ class "hero-body has-text-centered" ]
                [ div [ class "container" ]
                    [ h1 [ class "title" ] [ text <| (translate model.language GroupTitle) ++ id ] ]
                ]
            ]
