import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getAuthenticatedUser } from "src/app/store/getters";
import { AppState } from "src/app/store/app.state";
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
  /**
   * The authenticated user
   */
  public user: Observable<User>;

  /**
   * @constructor
   * @param {Store<AppState>} store Ngrx store service
   */
  constructor(private store: Store<AppState>) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @method ngOnInit
   */
  public ngOnInit() {
    // get authenticated user
    this.user = this.store.select<User>(getAuthenticatedUser);
  }
}
