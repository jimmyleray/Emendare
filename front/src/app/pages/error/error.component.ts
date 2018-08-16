import { appErrors } from "src/app/config";
import { Component } from "@angular/core";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"]
})
export class ErrorComponent {
  public errors = appErrors;
}
