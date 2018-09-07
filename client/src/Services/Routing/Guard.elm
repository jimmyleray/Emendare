module Services.Routing.Guard exposing (..)

import Browser.Navigation exposing (pushUrl)

import Services.Core.Model exposing (Model)
import Services.Routing.Routes exposing (routes, Route)
import Services.Core.Messages exposing (Msg)



redirectIfProtected : Route -> Model -> Cmd Msg
redirectIfProtected route model =
    if route.needAuth && not model.isAuthentified then 
        pushUrl model.key routes.signin.url
    else
        Cmd.none