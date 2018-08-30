module Views.Navbar exposing (view)

import Html exposing (Html, nav, div, a, text)
import Html.Attributes exposing (attribute, class, href) 

import Services.Translate.Keys exposing (..)
import Services.Translate.Main exposing (translate, tagToString, LanguageTag(..))

import Services.Routing.Main exposing (Route(..))
import Core.Model exposing (Model)
import Core.Messages exposing (Msg)

import Views.Link
import Views.IconLink
import Views.TranslateDrop


view : Model -> Html Msg
view model =
    nav [ attribute "aria-label" "main navigation", class "navbar is-info is-fixed-top is-transparent", attribute "role" "navigation" ]
        [ div [ class "navbar-brand" ]
            [ a [ class "navbar-item", href "/" ] [ text "Emendare" ] ]
        , div [ class "navbar-end" ] 
            [ Views.Link.view Readme
            , Views.IconLink.view "https://github.com/JimmyLeray/Emendare" "fab fa-github" "GitHub" model
            , Views.IconLink.view "https://emendare-documentation.cleverapps.io/" "fas fa-book" "Documentation" model
            , Views.TranslateDrop.view model
            ]
        ]