module Services.Translate.En exposing (enTranslations)

import Services.Translate.Keys exposing (TranslationKey(..))


enTranslations : TranslationKey -> String
enTranslations key =
    case key of
        Welcome ->
            "Open source platform with democratic community management of amendable texts"

        Error404 ->
            "Error 404"

        Home ->
            "Home"

        Home_Title ->
            "The Digital Parliament"

        Home_Subtitle ->
            "Open source platform with democratic community management of amendable texts"

        Home_Description ->
            "An amendment is a proposal, submitted to the vote of a meeting, to correct, complete or cancel all or part of a draft text"

        Features_Editor ->
            "Advanced Editor of Amendments"

        Features_Editor_Desc ->
            "Users can propose changes to public texts or these or their organizations"

        Features_Groups ->
            "Management of think tanks"

        Features_Groups_Desc ->
            "Organizations can manage finely and collectively their own rules of administration"

        Features_Votes ->
            "Organization of the votes"

        Features_Votes_Desc ->
            "The votes on the proposals of the users are organized and applied automatically"

        Use_Cases_Company ->
            "Enterprises & cooperatives"

        Use_Cases_Company_Desc ->
            "Horizontally write texts related to your professional activities"

        Use_Cases_Politics ->
            "Political parties & unions"

        Use_Cases_Politics_Desc ->
            "Write your political programs and your demands"

        Use_Cases_Groups ->
            "Groups & associations"

        Use_Cases_Groups_Desc ->
            "Collectively write your reports of discussions or your petitions"

        Log_in ->
            "Log in"

        Log_out ->
            "Log out"

        Create_Account ->
            "Create an account"

        Password ->
            "Password"

        Email ->
            "Email address"

        Issues ->
            "Report an issue"

        Documentation ->
            "Documentation"

        Repository ->
            "GitHub"

        Features ->
            "Features"

        Use_Cases ->
            "Use cases"

        Developers ->
            "Developers"

        Add ->
            "Add / Create"

        Group_add ->
            "Create a group"

        Text_add ->
            "Create a text"

        Groups_List ->
            "My groups"

        Texts_List ->
            "My texts"

        Votes_List ->
            "My votes"

        Add_Amend ->
            "Create an amendment"

        Show_Text ->
            "Show this text"

        Show_Group ->
            "Show this group"

        Followed_Texts ->
            "List of texts you follow"

        Followed_Groups ->
            "List of groups you follow"

        HomeTitle ->
            "Home"
        
        SignInTitle ->
            "Sign in"

        SignUpTitle ->
            "Sign up"

        ProfileTitle ->
            "Profile"

        NotFoundTitle ->
            "Not Found"

        ExploreTitle ->
            "Explore"

        GroupTitle ->
            "Group"

        TextTitle ->
            "Text"