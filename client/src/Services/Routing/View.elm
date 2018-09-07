module Services.Routing.View exposing (routerView)

import Html exposing (Html)

import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)
import Services.Routing.Main exposing (fromUrl)
import Services.Routing.Routes exposing (Route)



routerView : Model -> Html Msg
routerView model =
    let 
        route : Route
        route = 
            (fromUrl model.url)
    in
    route.view model