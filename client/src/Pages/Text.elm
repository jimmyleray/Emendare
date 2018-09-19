module Pages.Text exposing (view)

import Markdown
import Html exposing (..)
import Html.Attributes exposing (class, href) 

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Translate.Main exposing (translate)
import Services.Core.Model exposing (Model, Text)
import Services.Core.Messages exposing (Msg)
import Services.Routing.Routes exposing (Route(..), getRouteUrl)



view : Model -> Int -> Html Msg
view model id =
    section [ class "hero is-fullheight" ]
            [ div [ class "hero-body" ]
                [ case model.text of
                    Just txt ->
                        viewContainer model txt
                        
                    Nothing ->
                        div [ class "container" ] []
                ]
            ]



viewContainer : Model -> Text -> Html Msg
viewContainer model txt =
    div [ class "markdown-container" ]
        [ nav [ class "breadcrumb" ]
            [ ul []
                [ li []
                    [ a [ href <| getRouteUrl <| Group txt.namespace.id ]
                        [ text txt.namespace.name ]
                    ]
                , li [ class "is-active" ] [ a [ href "" ] [ text txt.name ] ]
                ]
            ]
        , h1 [ class "title" ] [ text txt.name ] 
        , h2 [ class "subtitle" ] [ text txt.description ]
        , case txt.content of
            Just content ->
                Markdown.toHtml [class "box markdown-body"] content
                
            Nothing ->
                div [] []
        ]