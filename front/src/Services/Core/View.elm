module Services.Core.View exposing (view)

import Browser exposing (Document)

import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)
import Services.Routing.Main exposing (getActualRouteTitle)

import Layouts.Body



view : Model -> Document Msg
view model =
    { title = "Emendare | " ++ getActualRouteTitle model
    , body = [ Layouts.Body.view model ]
    }