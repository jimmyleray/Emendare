module Core.Subscriptions exposing (subscriptions)

import Core.Model exposing (Model)
import Core.Messages exposing (Msg)



subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none