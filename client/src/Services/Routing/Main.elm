module Services.Routing.Main exposing (..)

import Url
import Url.Parser as Parser exposing (Parser, oneOf, s, (</>), string)

import Services.Core.Model exposing (Model)
import Services.Translate.Keys exposing (TranslationKey)
import Services.Routing.Routes exposing (Route(..), getRouteTitle)



parser : Parser (Route -> a) a
parser =
    oneOf 
        [ Parser.map Root Parser.top
        , Parser.map SignIn (s "sign-in")
        , Parser.map SignUp (s "sign-up")
        , Parser.map Profile (s "profile")
        , Parser.map Explore (s "explore")
        , Parser.map Group (s "group" </> string)
        , Parser.map Text (s "text" </> string)
        ]



fromUrl : Url.Url -> Route
fromUrl url =
    Maybe.withDefault NotFound <| Parser.parse parser url



getActualRouteTitle : Model -> TranslationKey
getActualRouteTitle model =
    getRouteTitle <| fromUrl model.url