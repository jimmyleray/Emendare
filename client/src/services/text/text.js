import { Amend } from '../../services'

/**
 * This service will help to manage Text
 */
export class Text {
  static hasOpenAmend = text =>
    text.amends.filter(amend => !amend.closed).length > 0

  static hasOpenAmendUnvoted = user => text =>
    text.amends
      .filter(amend => !amend.closed)
      .filter(amend => !Amend.isVoted(user)(amend)).length > 0
}
