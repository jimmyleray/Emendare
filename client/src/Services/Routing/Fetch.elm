module Services.Routing.Fetch exposing (fetchData)

import Browser.Navigation exposing (pushUrl)
import Http exposing (..)

import Services.Core.Config exposing (rootGroupID)
import Services.Core.Model exposing (Model)
import Services.Routing.Routes exposing (Route(..), getRouteUrl)
import Services.Core.Messages exposing (Msg(..))



fetchData : Route -> Model -> Cmd Msg
fetchData route model =
    case route of
        Explore ->
            Http.send GroupReceived (Http.getString <| model.apiUrl ++ "/groups/" ++ String.fromInt rootGroupID)

        Group id ->
            Http.send GroupReceived (Http.getString <| model.apiUrl ++ "/groups/" ++ String.fromInt id)

        _ ->
            Cmd.none