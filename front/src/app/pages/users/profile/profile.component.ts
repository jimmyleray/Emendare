import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getAuthenticatedUser } from "src/app/store/getters";
import { AppState } from "src/app/store/app.state";
import { User } from "src/app/models";
import { appRoutes } from "src/app/config";

/**
 * The user"s account.
 * @class MyAccountComponent
 */
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  /**
   * Route paths configuration
   */
  public appRoutes = appRoutes;

  /**
   * The authenticated user
   */
  public user: Observable<User>;

  /**
   * @constructor Constructor function
   * @param {Store<AppState>} store Ngrx store service
   */
  constructor(private store: Store<AppState>) {}

  /**
   * @method ngOnInit Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  public ngOnInit() {
    this.user = this.store.select<User>(getAuthenticatedUser);
  }
}
