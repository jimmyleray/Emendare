import { Component, OnInit } from "@angular/core";
import { appRoutes } from "src/app/config";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Text } from "src/app/models";
import { TextService } from "src/app/services";

@Component({
  selector: "app-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.scss"]
})
export class TextComponent implements OnInit {
  /**
   * Route paths configuration
   */
  public appRoutes = appRoutes;

  public text$: Observable<Text>;

  constructor(
    private route: ActivatedRoute,
    private textService: TextService
  ) {}

  ngOnInit() {
    this.text$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(this.textService.getText(params.get("id")))
      )
    );
  }
}
