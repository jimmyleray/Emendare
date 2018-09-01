module Services.Routing.View exposing (routerView)

import Html exposing (Html)

import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)
import Services.Routing.Main exposing (Route(..), fromUrl)

import Pages.Home
import Pages.Readme
import Pages.SignIn
import Pages.SignUp
import Pages.Profile
import Pages.NotFound



routerView : Model -> Html Msg
routerView model =
    let 
        route : Route
        route = 
            (fromUrl model.url)
    in
    case route of
        Root ->
            Pages.Home.view model

        Readme ->
            Pages.Readme.view model

        SignIn ->
            Pages.SignIn.view model

        SignUp ->
            Pages.SignUp.view model

        Profile ->
            Pages.Profile.view model

        NotFound ->
            Pages.NotFound.view model