module Services.Core.Update exposing (update)

import Browser exposing (UrlRequest(..))
import Browser.Navigation exposing (load, pushUrl)
import Url exposing (toString)

import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg(..))
import Services.Routing.Routes exposing (routes)



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

        Connect ->
            ( { model | isAuthentified = True, userName = "Albard" }, pushUrl model.key routes.profile.url )

        Disconnect ->
            ( { model | isAuthentified = False, userName = "" }, pushUrl model.key routes.home.url )