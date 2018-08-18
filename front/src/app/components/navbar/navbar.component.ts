import { appConfig, appRoutes } from "src/app/config";
import { AppState } from "src/app/store/app.state";
import { isAuthenticated } from "src/app/store/getters";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public appConfig = appConfig;
  public appRoutes = appRoutes;
  public isAuthenticated: Observable<boolean>;

  ngOnInit(): void {
    this.isAuthenticated = this.store.select<boolean>(isAuthenticated);
  }

  constructor(private store: Store<AppState>) {}
}
