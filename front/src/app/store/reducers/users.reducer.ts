import { Actions, ActionTypes } from "../actions";
import { User } from "src/app/models";

/**
 * The state.
 * @interface UserState
 */
export interface UserState {
  // boolean if user is authenticated
  authenticated: boolean;

  // error message
  error?: string;

  // the authenticated user
  user?: User;
}

/**
 * The initial state.
 */
const initialState: UserState = {
  authenticated: false
};

/**
 * The reducer function.
 * @function reducer
 * @param {State} state Current state
 * @param {Actions} action Incoming action
 */
export function usersReducer(
  state: any = initialState,
  action: Actions
): UserState {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE:
      return state;

    case ActionTypes.AUTHENTICATED_ERROR:
      return {
        ...state,
        authenticated: false,
        error: action.payload.error.message
      };

    case ActionTypes.AUTHENTICATED_SUCCESS:
      return {
        ...state,
        authenticated: action.payload.authenticated,
        user: action.payload.user
      };

    case ActionTypes.AUTHENTICATE_ERROR:
    case ActionTypes.SIGN_UP_ERROR:
      return {
        ...state,
        authenticated: false,
        error: action.payload.error.message
      };

    case ActionTypes.AUTHENTICATE_SUCCESS:
    case ActionTypes.SIGN_UP_SUCCESS:
      const user: User = action.payload.user;

      // verify user is not null
      if (user === null) {
        return state;
      }

      return {
        ...state,
        authenticated: true,
        error: undefined,
        user: user
      };

    case ActionTypes.SIGN_OUT_ERROR:
      return {
        ...state,
        authenticated: true,
        error: action.payload.error.message,
        user: undefined
      };

    case ActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        error: undefined,
        user: undefined
      };

    case ActionTypes.SIGN_UP:
      return {
        ...state,
        authenticated: false,
        error: undefined
      };

    default:
      return state;
  }
}
