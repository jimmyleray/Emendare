import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// components
import {
  HomeComponent,
  ErrorComponent,
  ProfilComponent,
  SignInComponent,
  SignOutComponent,
  SignUpComponent
} from "src/app/pages";

// guards
import { AuthenticationGuard } from "src/app/guards";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: "users",
    children: [
      {
        canActivate: [AuthenticationGuard],
        path: "profil",
        component: ProfilComponent
      },
      {
        path: "sign-in",
        component: SignInComponent
      },
      {
        path: "sign-out",
        component: SignOutComponent
      },
      {
        path: "sign-up",
        component: SignUpComponent
      },
      {
        path: "**",
        redirectTo: "/error/404"
      }
    ]
  },
  {
    path: "error/:code",
    component: ErrorComponent
  },
  {
    path: "**",
    redirectTo: "/error/404"
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class RoutingModule {}
