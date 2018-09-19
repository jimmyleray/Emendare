module Services.Core.Decode exposing (..)

import Json.Decode exposing (..)

import Services.Core.Model exposing (Group, Subgroup, Text, Namespace)



decodeGroup : Decoder Group
decodeGroup =
  map8 Group
    (field "description" string)
    (field "groups" <| list decodeSubgroup)
    (field "id" int)
    (field "name" string)
    (field "parent_id" <| nullable int)
    (field "path" string)
    (field "texts" <| list decodeText)
    (field "visibility" string)



decodeSubgroup : Decoder Subgroup
decodeSubgroup =
  map6 Subgroup
    (field "description" string)
    (field "id" int)
    (field "name" string)
    (field "parent_id" int)
    (field "path" string)
    (field "visibility" string)



decodeText : Decoder Text
decodeText =
  map8 Text
    (field "description" string)
    (maybe <| field "content" string)
    (field "http_url_to_repo" string)
    (field "id" int)
    (field "name" string)
    (field "namespace" decodeNamespace)
    (field "path" string)
    (field "readme_url" string)



decodeNamespace : Decoder Namespace
decodeNamespace =
  map5 Namespace
    (field "id" int)
    (field "kind" string)
    (field "name" string)
    (field "parent_id" <| nullable int)
    (field "path" string)
