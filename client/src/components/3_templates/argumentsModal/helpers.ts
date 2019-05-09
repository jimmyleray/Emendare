import { IArgument } from '../../../../../interfaces'
import { orderBy, findIndex } from 'lodash'

/**
 * Sort the list of arguments depending on the number of up votes
 * @param args list of arguments
 */
export const sortArgumentsByUpVote = (args: IArgument[]) =>
  orderBy(args, ['upVotesCount'], ['desc'])

/**
 * Sort the list of arguments depending on the number of up votes
 * @param args list of arguments
 */
export const sortArgumentsByUpCreated = (args: IArgument[]) =>
  orderBy(args, ['created'])

/**
 * Return the index of the most popular up argument
 * @param sortedArgumments List of arguments sorted by number of up vote
 */
export const getIndexMostFamousUpArgument = (sortedArgumments: IArgument[]) =>
  findIndex(sortedArgumments, (argument: IArgument) => argument.type === 'up')

/**
 * Return the index of the most popular down argument
 * @param sortedArgumments List of arguments sorted by number of down vote
 */
export const getIndexMostFamousDownArgument = (sortedArgumments: IArgument[]) =>
  findIndex(sortedArgumments, (argument: IArgument) => argument.type === 'down')

/**
 * Return the list of arguments sorted by the number of up votes and the first
 * argument is the the most popular up one et the second argument is the most popular down one
 * @param args list of arguments
 */
export const getListArgumentsWithPopularSorting = (args: IArgument[]) => {
  const sortedArgs = sortArgumentsByUpVote(args)
  // Most popular up argument
  const indexUpArgument = getIndexMostFamousUpArgument(sortedArgs)
  // Most popular down argument
  let indexDownArgument = getIndexMostFamousDownArgument(sortedArgs)
  // List of the most popular arguments
  const popularArguments: IArgument[] = []

  // Check if there are some up or down arguments and if they have more than 1 upVotesCount
  if (indexUpArgument > -1 && sortedArgs[indexUpArgument].upVotesCount !== 0) {
    popularArguments.push(sortedArgs[indexUpArgument])
    sortedArgs.splice(indexUpArgument, 1)
    indexDownArgument--
  }
  if (
    indexDownArgument > -1 &&
    sortedArgs[indexDownArgument].upVotesCount !== 0
  ) {
    popularArguments.push(sortedArgs[indexDownArgument])
    sortedArgs.splice(indexDownArgument, 1)
  }
  return popularArguments.concat(sortArgumentsByUpCreated(sortedArgs))
}
