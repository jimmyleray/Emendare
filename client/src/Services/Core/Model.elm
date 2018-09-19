module Services.Core.Model exposing (Model, Group, Subgroup, Text, Namespace)

import Browser.Navigation exposing (Key)
import Url exposing (Url)

import Services.Translate.Main exposing (LanguageTag)



type alias Model =
    { key : Key
    , url : Url
    , language : LanguageTag
    , isAuthentified : Bool
    , userName : String
    , apiUrl : String
    , group : Maybe Group
    , text : Maybe Text
    }



type alias Group =
    { description : String
    , groups : List Subgroup
    , id : Int
    , name : String
    , parent_id : Maybe Int
    , path : String
    , texts : List Text
    , visibility : String
    }



type alias Subgroup =
    { description : String
    , id : Int
    , name : String
    , parent_id : Int
    , path : String
    , visibility : String
    }



type alias Text =
    { description : String
    , content : Maybe String
    , http_url_to_repo : String
    , id : Int
    , name : String
    , namespace : Namespace
    , path : String
    , readme_url : String
    }



type alias Namespace =
    { id : Int
    , kind : String
    , name : String
    , parent_id : Maybe Int
    , path : String
    }