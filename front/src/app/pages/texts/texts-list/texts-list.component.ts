import { appRoutes } from "src/app/config";
import { Component, OnInit } from "@angular/core";
import { TextService } from "src/app/services";
import { Text } from "src/app/models";

@Component({
  selector: "app-texts-list",
  templateUrl: "./texts-list.component.html",
  styleUrls: ["./texts-list.component.scss"]
})
export class TextsListComponent implements OnInit {
  public appRoutes = appRoutes;

  public texts: Text[];
  public displayedColumns: string[] = ["name"];

  constructor(private textService: TextService) {}

  ngOnInit() {
    this.texts = this.textService.getAllTexts();
  }
}
