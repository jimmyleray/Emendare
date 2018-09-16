module Services.Routing.Routes exposing (Route(..), getRouteTitle, getRouteUrl)

import Html exposing (Html)

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)



type Route
    = Root
    | SignIn
    | SignUp 
    | Profile 
    | NotFound 
    | Explore 
    | Group String
    | Text String


getRouteTitle route =
    case route of
        Root ->
            HomeTitle
    
        SignIn ->
            SignInTitle

        SignUp ->
            SignUpTitle

        Profile ->
            ProfileTitle

        NotFound ->
            NotFoundTitle

        Explore ->
            ExploreTitle

        Group id ->
            GroupTitle

        Text id ->
            TextTitle
            

getRouteUrl route =
    case route of
        Root ->
            "/"
    
        SignIn ->
            "/sign-in"

        SignUp ->
            "/sign-up"

        Profile ->
            "/profile"

        NotFound ->
            "/not-found"

        Explore ->
            "/explore"

        Group id ->
            "/group/" ++ id

        Text id ->
            "/text/" ++ id