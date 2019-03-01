import { UPDATE_DATA } from './actions'

const item = {
  index: 'VN-Index',
  last: 'Sunny Garton',
  change: '(288) 1417941',
  percentChange: 'GMC',
  volume: 'Savana 2500',
  value: 'Yellow',
  buyVolume: '$99799.94',
  sellVolume: '2016-03-23',
  foreignNet: 5,
  putThoughVol: 2,
  putThoughValue: 2,
}

const data = [...Array(10)].reduce((result, _, index) => {
  return {
    ...result,
    [index + 1]: {
      ...item,
      id: index + 1,
    },
  }
}, {})

const ids = [...Array(10)].map((_, index) => index + 1)
const initialState = {
  ids,
  data,
}

const updateId = 2
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [updateId]: {
            ...state.data[updateId],
            foreignNet: Math.floor(Math.random() * 100),
          }
        },
      }
    default:
      return state
  }
}

export default reducer
