module Pages.Group exposing (view)

import Html exposing (..)
import Html.Attributes exposing (class, href)
import Html.Events exposing (onClick)

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Translate.Main exposing (translate)
import Services.Core.Model exposing (Model, Group, Subgroup, Text)
import Services.Core.Messages exposing (Msg)
import Services.Routing.Routes as Route



view : Model -> Int -> Html Msg
view model id =
    section [ class "hero is-fullheight" ]
            [ div [ class "hero-body has-text-centered" ]
                [ case model.group of
                    Just group ->
                        viewContainer model group
                        
                    Nothing ->
                        div [ class "container" ] []
                ]
            ]



viewContainer : Model -> Group -> Html Msg
viewContainer model group =
    div [ class "container" ]
        [ h1 [ class "title" ] [ text <| (translate model.language GroupTitle) ++ " : " ++ group.name ] 
        , h2 [ class "subtitle" ] [ text group.description ]
        , viewTable group
        ]



viewTable : Group -> Html Msg
viewTable group =
    table [ class "table is-fullwidth is-striped is-bordered" ]
        [ viewHeader
        , viewBody group
        ]



viewBody : Group -> Html Msg
viewBody group =
    tbody []
        ( [ viewReturn group ]
        ++ (List.map viewGroup group.groups)
        ++ (List.map viewText group.texts)
        )



viewHeader : Html Msg
viewHeader =
    thead [] 
        [ tr []
            [ th [] [ text "Name" ]
            , th [] [ text "Description" ]
            ]
        ]



viewReturn : Group-> Html Msg
viewReturn group =
    case group.parent_id of
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
            [ span [ class "icon" ]
                [ i [ class "far fa-file" ] [] ]
            , a [ href <| Route.getRouteUrl <| Route.Text txt.id ] 
                [ text txt.name ] 
            ]
        , td [] [ text txt.description ]
        ]