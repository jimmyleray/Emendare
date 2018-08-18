import { Component } from "@angular/core";
import { readmePath } from "src/app/config";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  public readmePath = readmePath;
}
