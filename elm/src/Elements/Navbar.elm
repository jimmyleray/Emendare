module Elements.Navbar exposing (view)

import Html exposing (Html, nav, div, a, text)
import Html.Attributes exposing (attribute, class, href) 

import Services.Translate.Keys exposing (..)
import Services.Translate.Main exposing (translate, tagToString, LanguageTag(..))
import Services.Routing.Main exposing (Route(..))
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)

import Elements.Link
import Elements.IconLink
import Elements.TranslateDrop


view : Model -> Html Msg
view model =
    nav [ attribute "aria-label" "main navigation", class "navbar is-dark is-fixed-top is-transparent", attribute "role" "navigation" ]
        [ div [ class "navbar-brand" ]
            [ a [ class "navbar-item", href "/" ] [ text "Emendare" ] ]
        , div [ class "navbar-end" ] 
            [ Elements.Link.view Readme
            , Elements.IconLink.view "https://github.com/JimmyLeray/Emendare" "fab fa-github" "GitHub" model
            , Elements.TranslateDrop.view model
            ]
        ]