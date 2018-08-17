import { Component } from "@angular/core";
import { appReadme } from "src/app/config";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  public appReadme = appReadme;
}
