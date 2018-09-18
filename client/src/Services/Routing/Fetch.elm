module Services.Routing.Fetch exposing (fetchData)

import Http exposing (send, get)
import Services.Core.Config exposing (rootGroupID)
import Services.Core.Model exposing (Model)
import Services.Routing.Routes exposing (Route(..))
import Services.Core.Messages exposing (Msg(..))
import Services.Core.Decode exposing (decodeGroup, decodeText)



fetchData : Route -> Model -> Cmd Msg
fetchData route model =
    case route of
        Explore ->
            send GroupReceived <| get (model.apiUrl ++ "/groups/" ++ String.fromInt rootGroupID) decodeGroup

        Group id ->
            send GroupReceived <| get (model.apiUrl ++ "/groups/" ++ String.fromInt id) decodeGroup

        Text id ->
            send TextReceived <| get (model.apiUrl ++ "/texts/" ++ String.fromInt id) decodeText

        _ ->
            Cmd.none
