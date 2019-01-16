/**
 * This service will help to manage Amend
 */
export class Amend {
  static isVoted = user => amend =>
    user.upVotes.indexOf(amend._id) >= 0 ||
    user.downVotes.indexOf(amend._id) >= 0 ||
    user.indVotes.indexOf(amend._id) >= 0
}
