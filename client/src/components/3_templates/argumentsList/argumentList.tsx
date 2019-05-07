/* eslint-disable sonarjs/cognitive-complexity */
import React from 'react'
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized'
import { Card, ArgumentRow, InfiniteList } from '../../../components'
import { IArgument } from '../../../../../interfaces'
// Helpers
import { isRowLoaded, loadMoreRows } from './helper'

interface IEventsListProps {
  args: IArgument[]
  amendID: string
  hasNextPage: boolean
}

// Default cache for cell mesurement
const cache = new CellMeasurerCache({
  fixedWidth: true
})

const rowRenderer = (args: IArgument[], amendID: string) => ({
  index,
  parent,
  style,
  key
}: any) => {
  return (
    <CellMeasurer
      key={key}
      cache={cache}
      columnIndex={0}
      rowIndex={index}
      parent={parent}
    >
      {({ measure }: any) => (
        <div style={style}>
          {args[index] ? (
            <ArgumentRow
              data={args[index]}
              amendID={amendID}
              measure={measure}
              index={index}
            />
          ) : null}
        </div>
      )}
    </CellMeasurer>
  )
}

export const ArgumentsList = ({
  args,
  amendID,
  hasNextPage
}: IEventsListProps) => {
  return (
    <React.Fragment>
      {args && args.length > 0 ? (
        <InfiniteList
          data={args}
          hasNextPage={hasNextPage}
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowRenderer={rowRenderer(args, amendID)}
          cache={cache}
        />
      ) : (
        <Card style={{ padding: '2rem' }}>
          <p className="is-size-5 has-text-centered">
            Aucun arguments postés pour ce vote
          </p>
        </Card>
      )}
    </React.Fragment>
  )
}
