// import @ngrx
import { Action } from "@ngrx/store";

// import models
import { User } from "src/app/models";

/**
 * List all available users actions
 */
export const ActionTypes = {
  AUTHENTICATE: "[users] Authenticate",
  AUTHENTICATE_ERROR: "[users] Authentication error",
  AUTHENTICATE_SUCCESS: "[users] Authentication success",
  AUTHENTICATED: "[users] Authenticated",
  AUTHENTICATED_ERROR: "[users] Authenticated error",
  AUTHENTICATED_SUCCESS: "[users] Authenticated success",
  SIGN_OUT: "[users] Sign off",
  SIGN_OUT_ERROR: "[users] Sign off error",
  SIGN_OUT_SUCCESS: "[users] Sign off success",
  SIGN_UP: "[users] Sign up",
  SIGN_UP_ERROR: "[users] Sign up error",
  SIGN_UP_SUCCESS: "[users] Sign up success"
};

/**
 * Authenticate.
 * @class AuthenticateAction
 * @implements {Action} Ngrx action interface
 */
export class AuthenticateAction implements Action {
  /**
   * Type of the action
   */
  public type: string = ActionTypes.AUTHENTICATE;
  constructor(public payload: { email: string; password: string }) {}
}

/**
 * Checks if user is authenticated.
 * @class AuthenticatedAction
 * @implements {Action} Ngrx action interface
 */
export class AuthenticatedAction implements Action {
  /**
   * Type of the action
   */
  public type: string = ActionTypes.AUTHENTICATED;

  /**
   * Constructor function
   * @param payload Payload typings
   */
  constructor(public payload?: { token?: string }) {}
}

/**
 * Authenticated check success.
 * @class AuthenticatedSuccessAction
 * @implements {Action} Ngrx action interface
 */
export class AuthenticatedSuccessAction implements Action {
  /**
   * Type of the action
   */
  public type: string = ActionTypes.AUTHENTICATED_SUCCESS;

  /**
   * Constructor function
   * @param payload Payload typings
   */
  constructor(public payload: { authenticated: boolean; user: User }) {}
}

/**
 * Authenticated check error.
 * @class AuthenticatedErrorAction
 * @implements {Action} Ngrx action interface
 */
export class AuthenticatedErrorAction implements Action {
  /**
   * Type of the action
   */
  public type: string = ActionTypes.AUTHENTICATED_ERROR;

  /**
   * Constructor function
   * @param payload Payload typings
   */
  constructor(public payload?: any) {}
}

/**
 * Authentication error.
 * @class AuthenticationErrorAction
 * @implements {Action} Ngrx action interface
 */
export class AuthenticationErrorAction implements Action {
  /**
   * Type of the action
   */
  public type: string = ActionTypes.AUTHENTICATE_ERROR;

  /**
   * Constructor function
   * @param payload Payload typings
   */
  constructor(public payload?: any) {}
}

/**
 * Authentication success.
 * @class AuthenticationSuccessAction
 * @implements {Action} Ngrx action interface
 */
export class AuthenticationSuccessAction implements Action {
  /**
   * Type of the action
   */
  public type: string = ActionTypes.AUTHENTICATE_SUCCESS;

  /**
   * Constructor function
   * @param payload Payload typings
   */
  constructor(public payload: { user: User }) {}
}

/**
 * Sign out.
 * @class SignOutAction
 * @implements {Action} Ngrx action interface
 */
export class SignOutAction implements Action {
  /**
   * Type of the action
   */
  public type: string = ActionTypes.SIGN_OUT;

  /**
   * Constructor function
   * @param payload Payload typings
   */
  constructor(public payload?: any) {}
}

/**
 * Sign out error.
 * @class SignOutErrorAction
 * @implements {Action} Ngrx action interface
 */
export class SignOutErrorAction implements Action {
  /**
   * Type of the action
   */
  public type: string = ActionTypes.SIGN_OUT_SUCCESS;

  /**
   * Constructor function
   * @param payload Payload typings
   */
  constructor(public payload?: any) {}
}

/**
 * Sign out success.
 * @class SignOutSuccessAction
 * @implements {Action} Ngrx action interface
 */
export class SignOutSuccessAction implements Action {
  /**
   * Type of the action
   */
  public type: string = ActionTypes.SIGN_OUT_SUCCESS;

  /**
   * Constructor function
   * @param payload Payload typings
   */
  constructor(public payload?: any) {}
}

/**
 * Sign up.
 * @class SignUpAction
 * @implements {Action} Ngrx action interface
 */
export class SignUpAction implements Action {
  /**
   * Type of the action
   */
  public type: string = ActionTypes.SIGN_UP;

  /**
   * Constructor function
   * @param payload Payload typings
   */
  constructor(public payload: { user: User }) {}
}

/**
 * Sign up error.
 * @class SignUpErrorAction
 * @implements {Action} Ngrx action interface
 */
export class SignUpErrorAction implements Action {
  /**
   * Type of the action
   */
  public type: string = ActionTypes.SIGN_UP_ERROR;

  /**
   * Constructor function
   * @param payload Payload typings
   */
  constructor(public payload?: any) {}
}

/**
 * Sign up success.
 * @class SignUpSuccessAction
 * @implements {Action} Ngrx action interface
 */
export class SignUpSuccessAction implements Action {
  /**
   * Type of the action
   */
  public type: string = ActionTypes.SIGN_UP_SUCCESS;

  /**
   * Constructor function
   * @param payload Payload typings
   */
  constructor(public payload: { user: User }) {}
}

/**
 * Actions type.
 * @type {Actions} Actions type
 */
export type Actions =
  | AuthenticateAction
  | AuthenticatedAction
  | AuthenticatedErrorAction
  | AuthenticatedSuccessAction
  | AuthenticationErrorAction
  | AuthenticationSuccessAction
  | SignUpAction
  | SignUpErrorAction
  | SignUpSuccessAction;
