module Core.View exposing (view)

import Core.Messages exposing (Msg)
import Core.Model exposing (Model)
import Html exposing (Html)
import Views.Body exposing (viewBody)


view : Model -> Html Msg
view model =
    viewBody model
