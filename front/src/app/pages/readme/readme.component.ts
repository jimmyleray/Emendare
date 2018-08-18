import { Component } from "@angular/core";
import { appConfig } from "src/app/config";

@Component({
  selector: "app-readme",
  templateUrl: "./readme.component.html",
  styleUrls: ["./readme.component.css"]
})
export class ReadmeComponent {
  public appConfig = appConfig;
}
