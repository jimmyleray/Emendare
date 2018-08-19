import { Component } from "@angular/core";
import { appRoutes } from "src/app/config";

@Component({
  selector: "app-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.css"]
})
export class TextComponent {
  /**
   * Route paths configuration
   */
  public appRoutes = appRoutes;
}
