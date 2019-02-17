import { Pagination } from './pagination'

test('Pagination resolve range of minmax', () => {
  // Error cases
  expect(Pagination.getRange(2, 1, 2)).toEqual([])
  expect(Pagination.getRange(1, 1, 0)).toEqual([])
  expect(Pagination.getRange(1, 1, 2)).toEqual([])

  // Standard cases
  expect(Pagination.getRange(1, 1, 1)).toEqual([1])
  expect(Pagination.getRange(1, 3, 2)).toEqual([1, 2, 3])
  expect(Pagination.getRange(1, 4, 3)).toEqual([1, 2, 3, 4])
  expect(Pagination.getRange(1, 5, 3)).toEqual([1, 2, 3, 4, 5])
  expect(Pagination.getRange(1, 6, 4)).toEqual([1, 2, 3, 4, 5, 6])
  expect(Pagination.getRange(1, 7, 4)).toEqual([1, 2, 3, 4, 5, 6, 7])
  expect(Pagination.getRange(1, 8, 4)).toEqual([1, 2, 3, 4, 5, '&', 8])
  expect(Pagination.getRange(1, 9, 5)).toEqual([1, '&', 4, 5, 6, '&', 9])
  expect(Pagination.getRange(1, 10, 6)).toEqual([1, '&', 5, 6, 7, '&', 10])
  expect(Pagination.getRange(1, 99, 65)).toEqual([1, '&', 64, 65, 66, '&', 99])
})
