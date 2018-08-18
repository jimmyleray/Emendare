import { Component } from "@angular/core";
import { appConfig } from "src/app/config";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  public appConfig = appConfig;
}
