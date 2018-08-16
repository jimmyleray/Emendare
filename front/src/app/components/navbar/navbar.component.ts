import { AppState } from "src/app/store/app.state";
import { isAuthenticated } from "src/app/store/getters";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { appRoutes, appTitle } from "src/app/config";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public routes = appRoutes;
  public title = appTitle;
  public isAuthenticated: Observable<boolean>;

  ngOnInit(): void {
    this.isAuthenticated = this.store.select<boolean>(isAuthenticated);
  }

  constructor(private store: Store<AppState>) {}
}
