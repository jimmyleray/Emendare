import { appRoutes } from "src/app/config";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import * as pages from "src/app/pages";
import * as guards from "src/app/guards";

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot([
      {
        path: appRoutes.HOME,
        pathMatch: "full",
        component: pages.HomeComponent
      },
      {
        path: appRoutes.README,
        component: pages.ReadmeComponent
      },
      {
        path: appRoutes.EXPLORE,
        component: pages.ExploreComponent
      },
      {
        canActivate: [guards.AuthenticationGuard],
        path: appRoutes.AMEND,
        component: pages.AmendComponent
      },
      {
        canActivate: [guards.AuthenticationGuard],
        path: appRoutes.TEXT,
        component: pages.TextComponent
      },
      {
        canActivate: [guards.AuthenticationGuard],
        path: appRoutes.TEXT_ADD,
        component: pages.TextAddComponent
      },
      {
        canActivate: [guards.AuthenticationGuard],
        path: appRoutes.TEXTS_LIST,
        component: pages.TextsListComponent
      },
      {
        canActivate: [guards.AuthenticationGuard],
        path: appRoutes.GROUP,
        component: pages.GroupComponent
      },
      {
        canActivate: [guards.AuthenticationGuard],
        path: appRoutes.GROUP_ADD,
        component: pages.GroupAddComponent
      },
      {
        canActivate: [guards.AuthenticationGuard],
        path: appRoutes.GROUPS_LIST,
        component: pages.GroupsListComponent
      },
      {
        canActivate: [guards.AuthenticationGuard],
        path: appRoutes.VOTES_LIST,
        component: pages.VotesListComponent
      },
      {
        canActivate: [guards.AuthenticationGuard],
        path: appRoutes.VOTE,
        component: pages.VoteComponent
      },
      {
        canActivate: [guards.AuthenticationGuard],
        path: appRoutes.PROFILE,
        component: pages.ProfileComponent
      },
      {
        path: appRoutes.SIGNIN,
        component: pages.SignInComponent
      },
      {
        path: appRoutes.SIGNOUT,
        component: pages.SignOutComponent
      },
      {
        path: appRoutes.SIGNUP,
        component: pages.SignUpComponent
      },
      {
        path: "error/:code",
        component: pages.ErrorComponent
      },
      {
        path: "**",
        redirectTo: "/error/404"
      }
    ])
  ]
})
export class RoutingModule {}
