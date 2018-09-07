module Services.Core.View exposing (view)

import Browser exposing (Document)

import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)
import Services.Routing.Main exposing (fromUrl)
import Services.Translate.Main exposing (translate)
import Services.Routing.View exposing (routerView)

import Elements.Navbar



view : Model -> Document Msg
view model =
    { title = "Emendare | " ++ (translate model.language <| (fromUrl model.url).title)
    , body =
        [ Elements.Navbar.view model
        , routerView model
        ]
    }