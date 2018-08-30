module Core.Update exposing (update)

import Browser exposing (UrlRequest(..))
import Core.Model exposing (Model)
import Browser.Navigation exposing (load, pushUrl)
import Core.Messages exposing (Msg(..))
import Url exposing (toString)



update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Internal url ->
                    ( model, pushUrl model.key <| toString url )

                External href ->
                    ( model, load href )

        UrlChanged url ->
            ( { model | url = url } , Cmd.none )

        ChangeLanguage language ->
            ( { model | language = language }, Cmd.none )