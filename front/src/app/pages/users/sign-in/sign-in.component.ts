import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

// @ngrx
import { Store } from "@ngrx/store";

// rxjs
import { Observable, Subscription } from "rxjs";
import { takeWhile, filter } from "rxjs/operators";
import { AuthenticateAction } from "src/app/store/actions";

// reducers
import {
  getAuthenticationError,
  isAuthenticated,
  isAuthenticationLoading
} from "src/app/store/getters";

import { AppState } from "src/app/store/app.state";

/**
 * /users/sign-in
 * @class SignInComponent
 */
@Component({
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnDestroy, OnInit {
  /**
   * The error if authentication fails.
   * @type {Observable<string>}
   */
  public error: Observable<string>;

  /**
   * True if the authentication is loading.
   * @type {boolean}
   */
  public loading: Observable<boolean>;

  /**
   * The authentication form.
   * @type {FormGroup}
   */
  public form: FormGroup;

  /**
   * Component subscription
   * @type {Subscription}
   */
  private subscription: Subscription;

  /**
   * @constructor
   * @param {FormBuilder} formBuilder
   * @param {Store<AppState>} store
   */
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @method ngOnInit
   */
  public ngOnInit() {
    // set formGroup
    this.form = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.error = this.store.select<string>(getAuthenticationError);
    this.loading = this.store.select<boolean>(isAuthenticationLoading);

    // subscribe to success
    this.subscription = this.store
      .select<boolean>(isAuthenticated)
      .pipe(filter(authenticated => authenticated))
      .subscribe(value => {
        this.router.navigate(["/users/profil"]);
      });
  }

  /**
   *  Lifecycle hook that is called when a directive, pipe or service is destroyed.
   * @method ngOnDestroy
   */
  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Submit the authentication form.
   * @method submit
   */
  public submit() {
    // get email and password values
    const email: string = this.form.get("email").value.trim();
    const password: string = this.form.get("password").value.trim();

    // dispatch AuthenticationAction and pass in payload
    this.store.dispatch(
      new AuthenticateAction({
        email,
        password
      })
    );
  }
}
