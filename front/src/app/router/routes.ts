import { appRoutes } from "src/app/config";
import { Routes } from "@angular/router";
import * as pages from "src/app/pages";
import * as guards from "src/app/guards";

export const routes: Routes = [
  {
    path: appRoutes.HOME,
    pathMatch: "full",
    component: pages.HomeComponent
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
];
