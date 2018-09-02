module Elements.Navbar exposing (view)

import Html exposing (Html, nav, div, a, span, i, text)
import Html.Attributes exposing (attribute, class, href, title, target)
import Html.Events exposing (onClick)

import Services.Translate.Keys exposing (..)
import Services.Translate.Main exposing (translate, tagToString, LanguageTag(..))
import Services.Routing.Routes exposing (Route(..))
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg(..))
import Services.Core.Utils exposing (ifThenElse)

import Elements.Link
import Elements.TranslateDrop


view : Model -> Html Msg
view model =
    nav [ attribute "aria-label" "main navigation", class "navbar is-dark is-fixed-top is-transparent", attribute "role" "navigation" ]
        [ div [ class "navbar-brand" ]
            [ a [ class "navbar-item", href "/" ] [ text "Emendare" ] ]
        , div [ class "navbar-end" ] 
            [ ifThenElse model.isAuthentified 
                (Elements.Link.view model Profile) 
                (Elements.Link.view model SignIn)
            , Elements.Link.view model Readme
            , a [ class "navbar-item", href "https://github.com/JimmyLeray/Emendare", title "GitHub", target "_blank" ]
                [ span [ class "icon fa-lg" ]
                    [ i [ class "fab fa-github" ] [] ]
                ]
            , Elements.TranslateDrop.view model
            ]
        ]