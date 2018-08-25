module Core.Messages exposing (Msg(..))

import Browser
import Url
import Translate.Utils exposing (LanguageTag)



type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | ChangeLanguage LanguageTag