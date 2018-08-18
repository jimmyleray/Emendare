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
        path: appRoutes.PROFILE,
        component: pages.ProfilComponent
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
