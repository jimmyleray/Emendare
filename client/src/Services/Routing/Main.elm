module Services.Routing.Main exposing (..)

import Url
import Url.Parser as Parser exposing (Parser, oneOf, s)

import Services.Core.Model exposing (Model)
import Services.Translate.Keys exposing (TranslationKey)
import Services.Routing.Routes exposing (routes, Route)



parser : Parser (Route -> a) a
parser =
    oneOf 
        [ Parser.map routes.home Parser.top
        , Parser.map routes.readme (s "readme")
        , Parser.map routes.signin (s "sign-in")
        , Parser.map routes.signup (s "sign-up")
        , Parser.map routes.profile (s "profile")
        ]



fromUrl : Url.Url -> Route
fromUrl url =
    Maybe.withDefault routes.notfound <| Parser.parse parser url



getActualRouteTitle : Model -> TranslationKey
getActualRouteTitle model =
    fromUrl model.url |> .title