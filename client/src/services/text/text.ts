import { Amend } from '..'

/**
 * This service will help to manage Text
 */
export class Text {
  public static hasOpenAmend = (amends: any) =>
    amends.filter((amend: any) => !amend.closed).length > 0

  public static hasOpenAmendUnvoted = (user: any) => (amends: any) =>
    amends
      .filter((amend: any) => !amend.closed)
      .filter((amend: any) => !Amend.isVoted(user)(amend)).length > 0
}
