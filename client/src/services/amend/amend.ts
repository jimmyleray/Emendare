/**
 * This service will help to manage Amend
 */
export class Amend {
  public static isVoted = (user: any) => (amend: any) =>
    user.upVotes.indexOf(amend._id) >= 0 ||
    user.downVotes.indexOf(amend._id) >= 0 ||
    user.indVotes.indexOf(amend._id) >= 0
}
