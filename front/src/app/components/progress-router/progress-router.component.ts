import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";

@Component({
  selector: "app-progress-router",
  templateUrl: "./progress-router.component.html",
  styleUrls: ["./progress-router.component.css"]
})
export class ProgressRouterComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public loading = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.subscription = this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
