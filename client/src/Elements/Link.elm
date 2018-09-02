module Elements.Link exposing (view)

import Html exposing (Html, a, text)
import Html.Attributes exposing (class, href)

import Services.Routing.Main exposing (Route, getRouteTitle, getRouteUrl)
import Services.Translate.Main exposing (translate)
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)



view : Model -> Route -> Html Msg
view model route =
    a [ class "navbar-item", href <| getRouteUrl route ] 
        [ text <| translate model.language <| getRouteTitle route ]