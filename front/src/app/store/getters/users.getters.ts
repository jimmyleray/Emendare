import { AppState } from "../app.state";

/**
 * Returns true if the user is authenticated.
 * @function isAuthenticated
 * @param {AppState} state
 * @returns {boolean}
 */
export const isAuthenticated = (state: AppState) => state.users.authenticated;

/**
 * Returns true if the authenticated has loaded.
 * @function isAuthenticatedLoaded
 * @param {AppState} state
 * @returns {boolean}
 */
export const isAuthenticatedLoaded = (state: AppState) => state.users.loaded;

/**
 * Return the users state
 * @function getAuthenticatedUser
 * @param {AppState} state
 * @returns {User}
 */
export const getAuthenticatedUser = (state: AppState) => state.users.user;

/**
 * Returns the authentication error.
 * @function getAuthenticationError
 * @param {AppState} state
 * @returns {Error}
 */
export const getAuthenticationError = (state: AppState) => state.users.error;

/**
 * Returns the sign out error.
 * @function getSignOutError
 * @param {AppState} state
 * @returns {Error}
 */
export const getSignOutError = (state: AppState) => state.users.error;

/**
 * Returns the sign up error.
 * @function getSignUpError
 * @param {AppState} state
 * @returns {Error}
 */
export const getSignUpError = (state: AppState) => state.users.error;
