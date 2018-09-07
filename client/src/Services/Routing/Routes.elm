module Services.Routing.Routes exposing (routes, Route)

import Html exposing (Html)

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)

import Pages.Home
import Pages.Readme
import Pages.SignIn
import Pages.SignUp
import Pages.Profile
import Pages.NotFound



type alias Route =
    { title : TranslationKey
    , url : String
    , view : Model -> Html Msg
    , needAuth : Bool
    }



routes = 
    { home =
        { title = HomeTitle
        , url = "/"
        , view = Pages.Home.view
        , needAuth = False
        }
    , readme =
        { title = ReadmeTitle
        , url = "/readme"
        , view = Pages.Readme.view
        , needAuth = False
        }
    , signin =
        { title = SignInTitle
        , url = "/sign-in"
        , view = Pages.SignIn.view
        , needAuth = False
        }
    , signup =
        { title = SignUpTitle
        , url = "/sign-up"
        , view = Pages.SignUp.view
        , needAuth = False
        }
    , profile =
        { title = ProfileTitle
        , url = "/profile"
        , view = Pages.Profile.view
        , needAuth = True
        }
    , notfound =
        { title = NotFoundTitle
        , url = "/not-found"
        , view = Pages.NotFound.view
        , needAuth = False
        }
    }