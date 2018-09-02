module Services.Routing.Main exposing (..)

import Url
import Url.Parser as Parser exposing (Parser, oneOf, s)

import Services.Core.Model exposing (Model)



type Route
    = Root
    | Readme
    | SignIn
    | SignUp
    | Profile
    | NotFound



parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map Root Parser.top
        , Parser.map Readme (s "readme")
        ]



fromUrl : Url.Url -> Route
fromUrl url =
    Maybe.withDefault NotFound <| Parser.parse parser url



getRouteTitle : Route -> String
getRouteTitle route =
    case route of
        Root ->
            "Home"

        Readme ->
            "Readme"
        
        SignIn ->
            "Sign in"

        SignUp ->
            "Sign up"

        Profile ->
            "Profile"

        NotFound ->
            "Not Found"


getActualRouteTitle : Model -> String
getActualRouteTitle model =
    getRouteTitle <| fromUrl model.url



getRouteUrl : Route -> String
getRouteUrl route =
    case route of
        Root ->
            "/"

        Readme ->
            "/readme"

        SignIn ->
            "/sign-in"

        SignUp ->
            "/sign-up"

        Profile ->
            "/profile"

        NotFound ->
            "/not-found"