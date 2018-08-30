module Services.Routing.Main exposing (..)

import Url
import Url.Parser as Parser exposing (Parser, oneOf, s)

import Services.Core.Model exposing (Model)



type Route
    = Root
    | Readme



parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map Root Parser.top
        , Parser.map Readme (s "readme")
        ]



fromUrl : Url.Url -> Maybe Route
fromUrl url =
    Parser.parse parser url



getRouteTitle : Route -> String
getRouteTitle route =
    case route of
        Root ->
            "Home"

        Readme ->
            "Readme"


getActualRouteTitle : Model -> String
getActualRouteTitle model =
    let 
        route : Maybe Route
        route = 
            (fromUrl model.url)
    in
    case route of
        Just Root ->
            "Home"

        Just Readme ->
            "Readme"

        Nothing ->
            "Not Found"



getRouteUrl : Route -> String
getRouteUrl route =
    case route of
        Root ->
            "/"

        Readme ->
            "/readme"