module Services.Routing.View exposing (routerView)

import Html exposing (Html)

import Services.Core.Config exposing (rootGroupID)
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)
import Services.Routing.Main exposing (fromUrl)
import Services.Routing.Routes exposing (Route(..))

import Pages.Home
import Pages.SignIn
import Pages.SignUp
import Pages.Profile
import Pages.NotFound
import Pages.Group
import Pages.Text



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
    
        SignIn ->
            Pages.SignIn.view model

        SignUp ->
            Pages.SignUp.view model

        Profile ->
            Pages.Profile.view model

        NotFound ->
            Pages.NotFound.view model

        Explore ->
            Pages.Group.view model rootGroupID

        Group id ->
            Pages.Group.view model id

        Text id ->
            Pages.Text.view model id