module Services.Core.Subscriptions exposing (subscriptions)

import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)



subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none