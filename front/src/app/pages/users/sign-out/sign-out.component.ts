import { appRoutes } from "src/app/config";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { SignOutAction } from "src/app/store/actions";
import { AppState } from "src/app/store/app.state";
import { Router } from "@angular/router";

/**
 * Sign-out page component
 */
@Component({
  templateUrl: "./sign-out.component.html",
  styleUrls: ["./sign-out.component.scss"]
})
export class SignOutComponent implements OnInit {
  public appRoutes = appRoutes;

  /**
   * @constructor Constructor function
   * @param {Store<AppState>} store Ngrx store service
   */
  constructor(private store: Store<AppState>, private router: Router) {}

  /**
   * @method ngOnInit Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
    this.store.dispatch(new SignOutAction());
    this.router.navigate([appRoutes.HOME]);
  }
}
