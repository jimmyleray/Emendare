module Services.Core.Messages exposing (Msg(..))

import Browser exposing (UrlRequest)
import Url exposing (Url)
import Http exposing (..)

import Services.Core.Model exposing (Group, Text)
import Services.Translate.Main exposing (LanguageTag)



type Msg
    = LinkClicked UrlRequest
    | UrlChanged Url
    | ChangeLanguage LanguageTag
    | Connect
    | Disconnect
    | GroupReceived (Result Http.Error Group)
    | TextReceived (Result Http.Error Text)