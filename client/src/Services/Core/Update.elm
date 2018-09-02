module Services.Core.Update exposing (update)

import Browser exposing (UrlRequest(..))
import Browser.Navigation exposing (load, pushUrl)
import Url exposing (toString)

import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg(..))
import Services.Routing.Main exposing (getRouteUrl, fromUrl)
import Services.Routing.Routes exposing (Route(..))



update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Internal url ->
                    if toString url == getRouteUrl SignIn then
                        ( model, pushUrl model.key <| toString url )
                    else
                        ( { model | redirectRoute = fromUrl model.url }, pushUrl model.key <| toString url )

                External href ->
                    ( model, load href )

        UrlChanged url ->
            ( { model | url = url } , Cmd.none )

        ChangeLanguage language ->
            ( { model | language = language }, Cmd.none )

        Connect ->
            ( { model | isAuthentified = True, userName = "Albard" }, pushUrl model.key <| getRouteUrl model.redirectRoute )

        Disconnect ->
            ( { model | isAuthentified = False, userName = "" }, pushUrl model.key <| getRouteUrl Root )