import { createAction, createReducer } from 'redux-act'
import moment from 'moment'
const REDUCER = 'real-time'
const NS = `@@${REDUCER}/`

export const setNodes = createAction(`${NS}SET_NODES`)

const getNumber = max => {
  return Math.random() * max
}
const genNodes = () => {
  return {
    supply: getNumber(2),
    nodes: [
      { ec: getNumber(1), volume: 300 },
      { ec: getNumber(1), volume: 300 },
      { ec: getNumber(1), volume: 300 },
      { ec: getNumber(1), volume: 300 },
      { ec: getNumber(1), volume: 300 },
      { ec: getNumber(1), volume: 300 },
      { ec: getNumber(1), volume: 300 },
      { ec: getNumber(1), volume: 300 },
      { ec: getNumber(1), volume: 300 },
    ],
    datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
  }
}

const initState = genNodes()

export default createReducer(
  {
    [setNodes]: (state, nodes) => ({ ...state, ...nodes }),
  },
  initState,
)
