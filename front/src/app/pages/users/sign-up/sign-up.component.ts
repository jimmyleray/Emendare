import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

// @ngrx
import { Store } from "@ngrx/store";

// rxjs
import { Observable, Subscription } from "rxjs";
import { takeWhile, filter } from "rxjs/operators";
import { AppState } from "src/app/store/app.state";

// actions
import { SignUpAction } from "src/app/store/actions";

// models
import { User } from "src/app/models";

// getters
import {
  getSignUpError,
  isAuthenticated,
  isAuthenticationLoading
} from "src/app/store/getters";

/**
 * /users/sign-up
 * @class SignUpComponent
 */
@Component({
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnDestroy, OnInit {
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
  public signupForm: FormGroup;

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
    // set FormGroup
    this.signupForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.error = this.store.select(getSignUpError);
    this.loading = this.store.select(isAuthenticationLoading);

    // subscribe to success
    this.subscription = this.store
      .select(isAuthenticated)
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
   * Submit the sign up form.
   * @method submit
   */
  public submit() {
    // create a new User object
    const user: User = new User();
    user.email = this.signupForm.get("email").value.trim();
    user.password = this.signupForm.get("password").value.trim();

    // dispatch SignUpAction and pass in payload
    this.store.dispatch(new SignUpAction({ user }));
  }
}
