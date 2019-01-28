import { Amend } from '..'

/**
 * This service will help to manage Text
 */
export class Text {
  public static hasOpenAmend = amends =>
    amends.filter(amend => !amend.closed).length > 0

  public static hasOpenAmendUnvoted = user => amends =>
    amends
      .filter(amend => !amend.closed)
      .filter(amend => !Amend.isVoted(user)(amend)).length > 0
}
