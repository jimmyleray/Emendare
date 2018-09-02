module Services.Translate.Fr exposing (frTranslations)

import Services.Translate.Keys exposing (TranslationKey(..))


frTranslations : TranslationKey -> String
frTranslations key =
    case key of
        Welcome ->
            "Plateforme open source avec une gestion communautaire et démocratique de textes amendables"

        Error404 ->
            "Erreur 404"

        NotFound ->
            "Page introuvable"

        Home ->
            "Accueil"

        Home_Title ->
            "Le Parlement numérique"

        Home_Subtitle ->
            "Plateforme open source avec une gestion communautaire et démocratique de textes amendables"

        Home_Description ->
            "Un amendement est une modification, soumise au vote d'une assemblée, en vue de corriger, compléter ou annuler tout ou une partie d'un projet de texte"

        Features_Editor ->
            "Editeur avancé d'amendements"

        Features_Editor_Desc ->
            "Les utilisateurs peuvent proposer des modifications sur les textes publics ou ceux de leurs organisations"

        Features_Groups ->
            "Gestion de groupes de réflexion"

        Features_Groups_Desc ->
            "Les organisations peuvent gérer finement et collectivement leurs propres règles d'administration"

        Features_Votes ->
            "Organisation des votes"

        Features_Votes_Desc ->
            "Les votes sur les propositions des utilisateurs sont organisés et appliqués automatiquement"

        Use_Cases_Company ->
            "Entreprises & coopératives"

        Use_Cases_Company_Desc ->
            "Rédigez horizontalement des textes liés à vos activités professionnelles"

        Use_Cases_Politics ->
            "Partis politiques & syndicats"

        Use_Cases_Politics_Desc ->
            "Rédigez vos programmes politiques et vos revendications"

        Use_Cases_Groups ->
            "Groupes & associations"

        Use_Cases_Groups_Desc ->
            "Rédigez collectivement vos rapports de discussions ou vos pétitions"

        Profile ->
            "Profil"

        Log_in ->
            "Connexion"

        Log_out ->
            "Déconnexion"

        Create_Account ->
            "Créer un compte"

        Password ->
            "Mot de passe"

        Email ->
            "Adresse mail"

        Issues ->
            "Rapporter un bug"

        Documentation ->
            "Documentation"

        Repository ->
            "GitHub"

        Features ->
            "Fonctionnalités"

        Use_Cases ->
            "Cas d'utilisation"

        Developers ->
            "Développeurs"

        Add ->
            "Ajouter / Créer"

        Explore ->
            "Explorer"

        Group_add ->
            "Créer un groupe"

        Text_add ->
            "Créer un texte"

        Groups_List ->
            "Mes groupes"

        Texts_List ->
            "Mes textes"

        Votes_List ->
            "Mes votes"

        Add_Amend ->
            "Créer un amendement"

        Show_Text ->
            "Afficher ce texte"

        Show_Group ->
            "Afficher ce groupe"

        Followed_Texts ->
            "Liste des textes que vous suivez"

        Followed_Groups ->
            "Liste des groupes que vous suivez"

        HomeTitle ->
            "Accueil"

        ReadmeTitle ->
            "Readme"
        
        SignInTitle ->
            "Connexion"

        SignUpTitle ->
            "Inscription"

        ProfileTitle ->
            "Profil"

        NotFoundTitle ->
            "Page introuvable"