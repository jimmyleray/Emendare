module Pages.Readme exposing (view)

import Browser exposing (Document)
import Core.Model exposing (Model)
import Core.Messages exposing (Msg)
import Views.Navbar



view : Model -> Document Msg
view model =
    { title = "Emendare | Readme"
    , body = [ Views.Navbar.view model ]
    }
