import { appRoutes } from "src/app/config";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { isAuthenticated } from "src/app/store/getters";
import { AppState } from "src/app/store/app.state";

/**
 * Prevent unauthorized activating and loading of routes
 * @class AuthenticatedGuard
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {
  /**
   * @constructor
   * @param {Store<AppState>} store Ngrx store service
   * @param {Router} router Angular Router service
   */
  constructor(private store: Store<AppState>, private router: Router) {}

  /**
   * True when user is authenticated
   * @method canActivate
   */
  canActivate(): Observable<boolean> {
    // get observable
    const observable = this.store.select<boolean>(isAuthenticated);

    // redirect to sign in page if user is not authenticated
    observable.subscribe(authenticated => {
      if (!authenticated) {
        this.router.navigate([appRoutes.SIGNIN]);
      }
    });

    return observable;
  }
}
