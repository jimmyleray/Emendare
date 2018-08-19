import { Component } from "@angular/core";
import { appConfig } from "src/app/config";

/**
 * Readme page component
 */
@Component({
  selector: "app-readme",
  templateUrl: "./readme.component.html",
  styleUrls: ["./readme.component.scss"]
})
export class ReadmeComponent {
  /**
   * Application configuration
   */
  public appConfig = appConfig;
}
