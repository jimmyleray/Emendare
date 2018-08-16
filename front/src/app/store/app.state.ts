import { RouterReducerState } from "@ngrx/router-store";
import { UserState } from "./reducers";

export interface AppState {
  router: RouterReducerState;
  users: UserState;
}
