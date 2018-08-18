import { appErrors } from "src/app/config";
import { Component } from "@angular/core";

/**
 * Errors page component
 */
@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"]
})
export class ErrorComponent {
  /**
   * List of all client errors
   */
  public errors = appErrors;
}
