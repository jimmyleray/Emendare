import { appConfig, appRoutes } from "src/app/config";
import { AppState } from "src/app/store/app.state";
import { isAuthenticated } from "src/app/store/getters";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

/**
 * Main navbar component
 */
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  /**
   * Application configuration
   */
  public appConfig = appConfig;

  /**
   * Route paths configuration
   */
  public appRoutes = appRoutes;

  /**
   * User authentification status
   */
  public isAuthenticated: Observable<boolean>;

  /**
   * On Init hook to initiate user status
   */
  ngOnInit(): void {
    this.isAuthenticated = this.store.select<boolean>(isAuthenticated);
  }

  /**
   * @constructor Constructor function
   * @param {Store<AppState>} store Ngrx store service
   */
  constructor(private store: Store<AppState>) {}
}
