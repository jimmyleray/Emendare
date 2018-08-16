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

  // true if we have attempted existing auth session
  loaded: boolean;

  // true when loading
  loading: boolean;

  // the authenticated user
  user?: User;
}

/**
 * The initial state.
 */
const initialState: UserState = {
  authenticated: false,
  loaded: false,
  loading: false
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
      return {
        ...state,
        loading: true
      };

    case ActionTypes.AUTHENTICATED_ERROR:
      return {
        ...state,
        authenticated: false,
        error: action.payload.error.message,
        loaded: true
      };

    case ActionTypes.AUTHENTICATED_SUCCESS:
      return {
        ...state,
        authenticated: action.payload.authenticated,
        loaded: true,
        user: action.payload.user
      };

    case ActionTypes.AUTHENTICATE_ERROR:
    case ActionTypes.SIGN_UP_ERROR:
      return {
        ...state,
        authenticated: false,
        error: action.payload.error.message,
        loading: false
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
        loading: false,
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
        error: undefined,
        loading: true
      };

    default:
      return state;
  }
}
