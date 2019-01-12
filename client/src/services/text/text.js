/**
 * This service will help to manage Text
 */
export class Text {
  static hasOpenAmend = text =>
    text.amends.filter(amend => !amend.closed).length > 0

  static hasOpenAmendUnvoted = user => text =>
    text.amends
      .filter(amend => !amend.closed)
      .filter(amend => {
        return (
          user.upVotes.indexOf(amend._id) === -1 &&
          user.downVotes.indexOf(amend._id) === -1
        )
      }).length > 0
}
