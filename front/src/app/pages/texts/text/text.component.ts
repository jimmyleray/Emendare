import { Component } from "@angular/core";
import { appRoutes } from "src/app/config";

@Component({
  selector: "app-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.scss"]
})
export class TextComponent {
  /**
   * Route paths configuration
   */
  public appRoutes = appRoutes;
}
