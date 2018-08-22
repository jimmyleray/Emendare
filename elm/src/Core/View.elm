module Core.View exposing (view)

import Html exposing (Html)
import Views.Body exposing (body)
import Core.Messages exposing (Msg)
import Core.Model exposing (Model)

view : Model -> Html Msg
view model = body model