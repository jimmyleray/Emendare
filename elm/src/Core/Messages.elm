module Core.Messages exposing (Msg(..))

import Translate.Utils exposing (LanguageTag)


type Msg
    = ChangeLanguage LanguageTag
