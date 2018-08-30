module Services.Routing.Main exposing (..)

import Url
import Url.Parser as Parser exposing (Parser, oneOf, s)



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



getRouteUrl : Route -> String
getRouteUrl route =
    case route of
        Root ->
            "/"

        Readme ->
            "/readme"