module Core.Update exposing (update)

import Browser
import Core.Model exposing (Model)
import Browser.Navigation as Nav
import Core.Messages exposing (Msg(..))
import Url



update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key <| Url.toString url )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url } , Cmd.none )

        ChangeLanguage language ->
            ( { model | language = language }, Cmd.none )