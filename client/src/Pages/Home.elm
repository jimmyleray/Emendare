module Pages.Home exposing (view)

import Html exposing (Html, section, div, h1, h2, h3, i, p, span, text)
import Html.Attributes exposing (class) 

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Translate.Main exposing (translate)
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg)



view : Model -> Html Msg
view model =
    div [ ] 
        [ section [ class "hero is-light is-fullheight" ] 
            [ div [ class "hero-body has-text-centered" ]
                [ div [ class "container content" ]
                    [ div [ ]
                        [ h2 [ ] [ text <| translate model.language Home_Subtitle ]
                        , p [ ] [ text <| translate model.language Home_Description ]
                        ]
                    , div [ class "margin-top-100" ] 
                        [ div [ class "columns has-text-centered" ] 
                            [ div [ class "column" ] 
                                [ span [ class "icon is-large" ] [ i [ class "fas fa-3x fa-edit" ] [] ]
                                , h3 [ ] [ text <| translate model.language Features_Editor ]
                                , p [ ] [ text <| translate model.language Features_Editor_Desc ]
                                ]
                            , div [ class "column" ] 
                                [ span [ class "icon is-large" ] [ i [ class "fas fa-3x fa-users" ] [] ]
                                , h3 [ ] [ text <| translate model.language Features_Groups ]
                                , p [ ] [ text <| translate model.language Features_Groups_Desc ]
                                ]
                            , div [ class "column" ] 
                                [ span [ class "icon is-large" ] [ i [ class "fas fa-3x fa-chart-pie" ] [] ]
                                , h3 [ ] [ text <| translate model.language Features_Votes ]
                                , p [ ] [ text <| translate model.language Features_Votes_Desc ]
                                ]
                            ] 
                        ]
                    , div [ class "margin-top-50" ] 
                        [ div [ class "columns has-text-centered" ] 
                            [ div [ class "column" ] 
                                [ h3 [ ] [ text <| translate model.language Use_Cases_Company ]
                                , p [ ] [ text <| translate model.language Use_Cases_Company_Desc ]
                                ]
                            , div [ class "column" ] 
                                [ h3 [ ] [ text <| translate model.language Use_Cases_Politics ]
                                , p [ ] [ text <| translate model.language Use_Cases_Politics_Desc ]
                                ]
                            , div [ class "column" ] 
                                [ h3 [ ] [ text <| translate model.language Use_Cases_Groups ]
                                , p [ ] [ text <| translate model.language Use_Cases_Groups_Desc ]
                                ]
                            ] 
                        ]
                    ]
                ]
            ]
        ]
    