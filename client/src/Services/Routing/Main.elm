module Services.Routing.Main exposing (..)

import Url
import Url.Parser as Parser exposing (Parser, oneOf, s)

import Services.Core.Model exposing (Model)
import Services.Translate.Keys exposing (..)
import Services.Translate.Main exposing (translate)



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
        , Parser.map SignIn (s "sign-in")
        , Parser.map SignUp (s "sign-up")
        , Parser.map Profile (s "profile")
        ]



fromUrl : Url.Url -> Route
fromUrl url =
    Maybe.withDefault NotFound <| Parser.parse parser url



getRouteTitle : Route -> TranslationKey
getRouteTitle route =
    case route of
        Root ->
            HomeTitle

        Readme ->
            ReadmeTitle
        
        SignIn ->
            SignInTitle

        SignUp ->
            SignUpTitle

        Profile ->
            ProfileTitle

        NotFound ->
            NotFoundTitle


getActualRouteTitle : Model -> String
getActualRouteTitle model =
    translate model.language <| getRouteTitle <| fromUrl model.url



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