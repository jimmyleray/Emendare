import { SettingsMenuComponent } from "./components/settings-menu/settings-menu.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RoutingModule } from "./router/routing.module";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment"; // Angular CLI environemnt
import { StoreRouterConnectingModule, routerReducer } from "@ngrx/router-store";
import { usersReducer } from "./store/reducers";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { UserEffects } from "./store/effects";

import { FlexLayoutModule } from "@angular/flex-layout";

import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatProgressBarModule
} from "@angular/material";

const modules = [
  FlexLayoutModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatProgressBarModule
];

// components
import { AppComponent } from "./layouts";
import { NavbarComponent, ProgressRouterComponent } from "./components";
import {
  HomeComponent,
  ErrorComponent,
  ProfilComponent,
  SignInComponent,
  SignOutComponent,
  SignUpComponent
} from "./pages";

const components = [
  AppComponent,
  NavbarComponent,
  SettingsMenuComponent,
  ProgressRouterComponent,
  HomeComponent,
  ErrorComponent,
  ProfilComponent,
  SignInComponent,
  SignOutComponent,
  SignUpComponent
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: components,
  imports: [
    ...modules,
    RoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({
      router: routerReducer,
      users: usersReducer
    }),
    // Connects RouterModule with StoreModule
    StoreRouterConnectingModule.forRoot({
      stateKey: "router" // name of reducer key
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([UserEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
