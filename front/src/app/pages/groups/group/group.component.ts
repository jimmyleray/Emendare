import { Component, OnInit } from "@angular/core";
import { appRoutes } from "src/app/config";
import { TextService, GroupService } from "src/app/services";
import { Observable, of } from "rxjs";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Text, Group } from "src/app/models";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.scss"]
})
export class GroupComponent implements OnInit {
  public appRoutes = appRoutes;

  public displayedColumns: string[] = ["name"];
  public texts$: Observable<Text[]>;
  public group$: Observable<Group>;

  constructor(
    private route: ActivatedRoute,
    private textService: TextService,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.group$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(this.groupService.getGroup(params.get("id")))
      )
    );
    this.texts$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(this.textService.getTexts(params.get("id")))
      )
    );
  }
}
