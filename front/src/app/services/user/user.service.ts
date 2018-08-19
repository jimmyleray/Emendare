import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { User } from "src/app/models/user";

/**
 * A mocked user for test purposes
 */
export const MOCK_USER = new User();
MOCK_USER._id = "uniq_id";
MOCK_USER.email = "foo@bar.com";
MOCK_USER.password = "pass";

/**
 * User service
 */
@Injectable()
export class UserService {
  /**
   * True if authenticated
   */
  private _authenticated = false;

  /**
   * Authenticate the user
   * @param {string} email The user's email address
   * @param {string} password The user's password
   * @returns {Observable<User>} The authenticated user observable.
   */
  public authenticate(email: string, password: string): Observable<User> {
    // Normally you would do an HTTP request to determine to
    // attempt authenticating the user using the supplied credentials.

    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      this._authenticated = true;
      return of(MOCK_USER);
    }

    return throwError(new Error("Invalid email or password"));
  }

  /**
   * Determines if the user is authenticated
   * @returns {Observable<boolean>}
   */
  public authenticated(): Observable<boolean> {
    return of(this._authenticated);
  }

  /**
   * Returns the authenticated user
   * @returns {User}
   */
  public authenticatedUser(): Observable<User> {
    // Normally you would do an HTTP request to determine if
    // the user has an existing auth session on the server
    // but, let's just return the mock user for this example.
    return of(MOCK_USER);
  }

  /**
   * Create a new user
   * @returns {User}
   */
  public create(user: User): Observable<User> {
    // Normally you would do an HTTP request to POST the user
    // details and then return the new user object
    // but, let's just return the new user for this example.
    if (user.email === "" && user.password === "") {
      return throwError(new Error("Invalid email or password"));
    }

    this._authenticated = true;
    return of(user);
  }

  /**
   * End session
   * @returns {Observable<boolean>}
   */
  public signout(): Observable<boolean> {
    // Normally you would do an HTTP request sign end the session
    // but, let's just return an observable of true.
    this._authenticated = false;
    return of(true);
  }
}
