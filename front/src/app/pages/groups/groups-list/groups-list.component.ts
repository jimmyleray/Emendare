import { Component, OnInit } from "@angular/core";
import { appRoutes } from "src/app/config";
import { GroupService } from "src/app/services";
import { Group } from "src/app/models";

@Component({
  selector: "app-groups-list",
  templateUrl: "./groups-list.component.html",
  styleUrls: ["./groups-list.component.scss"]
})
export class GroupsListComponent implements OnInit {
  public appRoutes = appRoutes;

  public groups: Group[];
  public displayedColumns: string[] = ["name"];

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.groups = this.groupService.getAllGroups();
  }
}
