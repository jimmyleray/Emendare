module Core.Messages exposing (Msg(..))

import Browser exposing (UrlRequest)
import Url exposing (Url)
import Services.Translate.Main exposing (LanguageTag)



type Msg
    = LinkClicked UrlRequest
    | UrlChanged Url
    | ChangeLanguage LanguageTag