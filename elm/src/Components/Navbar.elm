module Components.Navbar exposing (view)

import Html exposing (Html, nav, div, a, text)
import Html.Attributes exposing (attribute, class, href) 

import Services.Translate.Keys exposing (..)
import Services.Translate.Main exposing (translate, tagToString, LanguageTag(..))
import Services.Routing.Main exposing (Route(..))
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)

import Components.Link
import Components.IconLink
import Components.TranslateDrop


view : Model -> Html Msg
view model =
    nav [ attribute "aria-label" "main navigation", class "navbar is-info is-fixed-top is-transparent", attribute "role" "navigation" ]
        [ div [ class "navbar-brand" ]
            [ a [ class "navbar-item", href "/" ] [ text "Emendare" ] ]
        , div [ class "navbar-end" ] 
            [ Components.Link.view Readme
            , Components.IconLink.view "https://github.com/JimmyLeray/Emendare" "fab fa-github" "GitHub" model
            , Components.IconLink.view "https://emendare-documentation.cleverapps.io/" "fas fa-book" "Documentation" model
            , Components.TranslateDrop.view model
            ]
        ]