import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";

/**
 * Progress bar on router loading component
 */
@Component({
  selector: "app-progress-router",
  templateUrl: "./progress-router.component.html",
  styleUrls: ["./progress-router.component.css"]
})
export class ProgressRouterComponent implements OnInit, OnDestroy {
  /**
   * Subscription to the app loading status
   */
  public subscription: Subscription;

  /**
   * Application loading status
   */
  public loading = false;

  /**
   * @constructor
   * @param {Router} router Angular router service
   */
  constructor(private router: Router) {}

  /**
   * On init hook to initiate the subscription
   * to the application loading status
   */
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

  /**
   * On destroy hook to unsubscribe
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
