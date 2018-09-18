module Pages.Group exposing (view)

import Html exposing (..)
import Html.Attributes exposing (class, href)
import Html.Events exposing (onClick)

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Translate.Main exposing (translate)
import Services.Core.Model exposing (Model, Subgroup, Text)
import Services.Core.Messages exposing (Msg)
import Services.Routing.Routes as Route



view : Model -> Int -> Html Msg
view model id =
    section [ class "hero is-fullheight" ]
            [ div [ class "hero-body has-text-centered" ]
                [ div [ class "container" ]
                    [ h1 [ class "title" ] [ text <| (translate model.language GroupTitle) ++ " : " ++ model.group.name ] 
                    , h2 [ class "subtitle" ] [ text model.group.description ]
                    , viewTable model
                    ]
                ]
            ]



viewTable : Model -> Html Msg
viewTable model =
    table [ class "table is-fullwidth is-striped is-bordered" ]
        [ viewHeader model
        , viewBody model
        ]



viewBody : Model -> Html Msg
viewBody model =
    tbody []
        ( [ viewReturn model ]
        ++ (List.map viewGroup model.group.groups)
        ++ (List.map viewText model.group.texts)
        )



viewHeader : Model -> Html Msg
viewHeader model =
    thead [] 
        [ tr []
            [ th [] [ text "Name" ]
            , th [] [ text "Description" ]
            ]
        ]



viewReturn : Model-> Html Msg
viewReturn model =
    case model.group.parent_id of
        Just parent_id ->
            tr []
                [ td []
                    [ span [ class "icon" ]
                        [ i [ class "fas fa-arrow-up" ] [] ]
                    , a [ href <| Route.getRouteUrl <| Route.Group parent_id ] 
                        [ text "Revenir au groupe parent" ] 
                    ]
                , td [] []
                ]

        Nothing ->
            tr [] []



viewGroup : Subgroup -> Html Msg
viewGroup group =
    tr []
        [ td [] 
            [ span [ class "icon" ]
                [ i [ class "fas fa-folder" ] [] ]
            , a [ href <| Route.getRouteUrl <| Route.Group group.id ] 
                [ text group.name ] 
            ]
        , td [] [ text group.description ]
        ]



viewText : Text -> Html Msg
viewText txt =
    tr []
        [ td [] 
            [ a [ href <| Route.getRouteUrl <| Route.Text txt.id ] 
                [ text txt.name ] 
            ]
        , td [] [ text txt.description ]
        ]