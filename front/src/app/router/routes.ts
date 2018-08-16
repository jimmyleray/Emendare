import { Routes } from "@angular/router";
import * as pages from "src/app/pages";
import * as guards from "src/app/guards";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: pages.HomeComponent
  },
  {
    canActivate: [guards.AuthenticationGuard],
    path: "profil",
    component: pages.ProfilComponent
  },
  {
    path: "sign-in",
    component: pages.SignInComponent
  },
  {
    path: "sign-out",
    component: pages.SignOutComponent
  },
  {
    path: "sign-up",
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
