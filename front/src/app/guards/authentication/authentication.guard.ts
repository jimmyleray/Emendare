import { appRoutes } from "src/app/config";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { isAuthenticated } from "src/app/store/getters";
import { AppState } from "src/app/store/app.state";
import { AuthService } from "src/app/services";

/**
 * Prevent unauthorized activating and loading of routes
 * @class AuthenticationGuard
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {
  /**
   * @constructor Constructor function
   * @param {Store<AppState>} store Ngrx store service
   * @param {Router} router Angular Router service
   */
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * True when user is authenticated
   * @method canActivate
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const observable = this.store.select<boolean>(isAuthenticated);

    // redirect to sign in page if user is not authenticated
    observable.subscribe(authenticated => {
      if (!authenticated) {
        this.authService.redirectUrl = state.url;
        this.router.navigate([appRoutes.SIGNIN]);
      }
    });

    return observable;
  }
}
