import { IArgument } from '../../../../../interfaces'
import { Socket } from '../../../services'
import { last } from 'lodash'

/**
 * Tell if the row is loaded
 * @param data List of events we want to render
 * @param index Index of the row
 */
export const isRowLoaded = (data: IArgument[]) => ({ index }: any) =>
  !!data[index]

/**
 * Fetch data from a API
 * @param data List of events we want to render
 */
export const loadMoreRows = (
  data: IArgument[],
  hasNextPage: boolean
) => async () => {
  if (hasNextPage) {
    // TODO: Fetch args
  }
}
