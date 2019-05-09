import { IArgument } from '../../../../interfaces'

export const hasUserDownVote = (
  userUnVote: Array<{ amendID: string; argumentID: string }>,
  amendID: string,
  argumentID: string
) =>
  userUnVote.find(
    (vote: { amendID: string; argumentID: string }) =>
      vote.amendID === amendID && vote.argumentID === argumentID
  )

export const hasUserUpVote = (
  userUpVote: Array<{ amendID: string; argumentID: string }>,
  amendID: string,
  argumentID: string
) =>
  userUpVote.find(
    (vote: { amendID: string; argumentID: string }) =>
      vote.amendID === amendID && vote.argumentID === argumentID
  )

export const isMostPopularUpArgument = (index: number, data: IArgument) => {
  return data.type === 'up' && data.upVotesCount > 0 && index === 0
}

export const isMostPopularDownArgument = (index: number, data: IArgument) => {
  return (
    data.type === 'down' &&
    data.upVotesCount > 0 &&
    (index === 1 || index === 0)
  )
}
