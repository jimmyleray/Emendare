import { Injectable } from "@angular/core";

// import @ngrx
import { Effect, Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";

// import rxjs
import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

// import services
import { UserService } from "src/app/services";

// import actions
import {
  ActionTypes,
  AuthenticatedErrorAction,
  AuthenticatedSuccessAction,
  AuthenticationErrorAction,
  AuthenticationSuccessAction,
  SignOutErrorAction,
  SignOutSuccessAction,
  SignUpErrorAction,
  SignUpSuccessAction,
  AuthenticateAction,
  AuthenticatedAction,
  SignUpAction,
  SignOutAction
} from "../actions";

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class UserEffects {
  /**
   * Authenticate user.
   */
  @Effect()
  public authenticate: Observable<Action> = this.actions
    .ofType<AuthenticateAction>(ActionTypes.AUTHENTICATE)
    .pipe(
      mergeMap(action => {
        console.log(action);
        return this.userService
          .authenticate(action.payload.email, action.payload.password)
          .pipe(
            map(user => new AuthenticationSuccessAction({ user })),
            catchError(error => of(new AuthenticationErrorAction({ error })))
          );
      })
    );

  /**
   * Determine if the user is authenticated.
   */
  @Effect()
  public authenticated: Observable<Action> = this.actions
    .ofType<AuthenticatedAction>(ActionTypes.AUTHENTICATED)
    .pipe(
      mergeMap(action =>
        this.userService.authenticatedUser().pipe(
          map(
            user =>
              new AuthenticatedSuccessAction({
                authenticated: user !== null,
                user
              })
          ),
          catchError(error => of(new AuthenticatedErrorAction({ error })))
        )
      )
    );

  /**
   * Create a new user.
   */
  @Effect()
  public createUser: Observable<Action> = this.actions
    .ofType<SignUpAction>(ActionTypes.SIGN_UP)
    .pipe(
      mergeMap(action =>
        this.userService.create(action.payload.user).pipe(
          map(user => new SignUpSuccessAction({ user })),
          catchError(error => of(new SignUpErrorAction({ error })))
        )
      )
    );

  /**
   * Terminate user session.
   */
  @Effect()
  public signOut: Observable<Action> = this.actions
    .ofType<SignOutAction>(ActionTypes.SIGN_OUT)
    .pipe(
      mergeMap(action =>
        this.userService.signout().pipe(
          map(value => new SignOutSuccessAction()),
          catchError(error => of(new SignOutErrorAction({ error })))
        )
      )
    );

  /**
   * @constructor
   * @param {Actions }actions
   * @param {UserService} userService
   */
  constructor(private actions: Actions, private userService: UserService) {}
}
