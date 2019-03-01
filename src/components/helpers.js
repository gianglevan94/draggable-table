import { SORT_TYPES } from './Table'

export const sort = ({ ids, data, valueFromItem, type }) => {
  return ids.concat().sort((a, b) => {
    if (valueFromItem(data[a]) < valueFromItem(data[b])) {
      return type === SORT_TYPES.ASC ? -1 : 1
    }

    if (valueFromItem(data[a]) > valueFromItem(data[b])) {
      return type === SORT_TYPES.ASC ? 1 : -1
    }

    return 0
  })
}
