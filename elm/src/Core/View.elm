module Core.View exposing (..)

import Browser
import Html exposing (..)
import Html.Events exposing (onClick)
import Html.Attributes exposing (..) 

import Translate.Keys exposing (..)
import Translate.Utils exposing (translate, tagToString, LanguageTag(..))

import Core.Router as Router
import Core.Model exposing (Model)
import Core.Messages exposing (Msg(..))



view : Model -> Browser.Document Msg
view model = viewPage (Router.fromUrl model.url) model



viewPage : Maybe Router.Route -> Model -> Browser.Document Msg
viewPage route model =
    case route of
        Just Router.Root ->
            viewHome model

        Just Router.Readme ->
            viewReadme model

        Nothing ->
            viewHome model



viewHome : Model -> Browser.Document Msg
viewHome model =
    { title = "Emendare | Home"
    , body =
        [ viewNavbar model
        , section [ class "hero is-dark" ]
            [ div [ class "hero-body" ]
                [ div [ class "container" ]
                    [ h1 [ class "title" ] [ text "Emendare" ]
                    , h2 [ class "subtitle" ] [ text <| translate model.language Welcome ]
                    ]
                ]
            ]
        ]
    }



viewReadme : Model -> Browser.Document Msg
viewReadme model =
    { title = "Emendare | Readme"
    , body = [ viewNavbar model ]
    }



-- COMPONENTS


viewNavbar : Model -> Html Msg
viewNavbar model =
    nav [ attribute "aria-label" "main navigation", class "navbar is-info is-fixed-top is-transparent", attribute "role" "navigation" ]
        [ div [ class "navbar-brand" ]
            [ a [ class "navbar-item", href "/" ] [ text "Emendare" ] ]
        , div [ class "navbar-end" ] 
            [ viewLink Router.Readme
            , viewIconLink "https://github.com/JimmyLeray/Emendare" "fab fa-github" "GitHub" model
            , viewIconLink "https://emendare-documentation.cleverapps.io/" "fas fa-book" "Documentation" model
            , viewTranslateDrop model
            ]
        ]



viewLink : Router.Route -> Html Msg
viewLink route =
    a [ class "navbar-item", href <| Router.getRouteUrl route ] 
        [ text <| Router.getRouteTitle route ]



viewIconLink : String -> String -> String -> Model -> Html Msg
viewIconLink link icon desc model =
    a [ class "navbar-item", href link, title desc ]
        [ span [ class "icon is-medium" ]
            [ i [ class icon ] [] ]
        ]



viewTranslateDrop : Model -> Html Msg
viewTranslateDrop model =
    div [ class "navbar-item has-dropdown is-hoverable" ]
        [ span [ class "navbar-link" ] [ text <| tagToString model.language ]
        , div [ class "navbar-dropdown is-right" ]
            [ span [ class "navbar-item", onClick <| ChangeLanguage FR ] [ text "Français" ]
            , span [ class "navbar-item", onClick <| ChangeLanguage EN ] [ text "English" ]
            ]
        ]