import { RouterReducerState } from "@ngrx/router-store";
import { UserState } from "./reducers";

/**
 * Interface to describe application state object
 */
export interface AppState {
  /**
   * Router state
   */
  router: RouterReducerState;

  /**
   * User state
   */
  users: UserState;
}
