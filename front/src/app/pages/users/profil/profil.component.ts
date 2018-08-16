import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// @ngrx
import { Store } from "@ngrx/store";

// rxjs
import { Observable } from "rxjs";

// getters
import { getAuthenticatedUser } from "src/app/store/getters";
import { AppState } from "src/app/store/app.state";

// models
import { User } from "src/app/models";

/**
 * The user"s account.
 * @class MyAccountComponent
 */
@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.css"]
})
export class ProfilComponent implements OnInit {
  // the authenticated user
  public user: Observable<User>;

  /**
   * @constructor
   */
  constructor(private store: Store<AppState>, private router: Router) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @method ngOnInit
   */
  public ngOnInit() {
    // get authenticated user
    this.user = this.store.select<User>(getAuthenticatedUser);
  }

  /**
   * Sign out.
   * @method signOut
   */
  public signOut() {
    this.router.navigate(["/users/sign-out"]);
  }
}
