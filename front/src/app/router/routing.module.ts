import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./routes";

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class RoutingModule {}
