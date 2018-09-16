module Services.Routing.Guard exposing (redirectIfProtected, needAuth)

import Browser.Navigation exposing (pushUrl)

import Services.Core.Model exposing (Model)
import Services.Routing.Routes exposing (Route(..), getRouteUrl)
import Services.Core.Messages exposing (Msg)



redirectIfProtected : Route -> Model -> Cmd Msg
redirectIfProtected route model =
    if needAuth route && not model.isAuthentified then 
        pushUrl model.key <| getRouteUrl SignIn
    else
        Cmd.none


needAuth route =
    case route of
        Profile ->
            True

        _ ->
            False