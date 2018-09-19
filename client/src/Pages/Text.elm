module Pages.Text exposing (view)

import Markdown
import Html exposing (Html, section, div, h1, h2, text)
import Html.Attributes exposing (class) 

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Translate.Main exposing (translate)
import Services.Core.Model exposing (Model, Text)
import Services.Core.Messages exposing (Msg)



view : Model -> Int -> Html Msg
view model id =
    section [ class "hero is-fullheight" ]
            [ div [ class "hero-body has-text-centered" ]
                [ case model.text of
                    Just txt ->
                        viewContainer model txt
                        
                    Nothing ->
                        div [ class "container" ] []
                ]
            ]



viewContainer : Model -> Text -> Html Msg
viewContainer model txt =
    div [ class "container" ]
        [ h1 [ class "title" ] [ text <| (translate model.language TextTitle) ++ " : " ++ txt.name ] 
        , h2 [ class "subtitle" ] [ text txt.description ]
        , case txt.content of
            Just content ->
                Markdown.toHtml [class "box has-text-left"] content
                
            Nothing ->
                div [] []
        ]