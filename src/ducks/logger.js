import { createAction, createReducer } from 'redux-act'
import axios from 'lib/axios'
import { notification } from 'antd'
import * as app from './app'
import { getOperation } from './vmn-operation'
import { _getControl } from './control'
import moment from 'moment';
const setLoggerPageData = createAction('SET_LOGGER_PAGE_DATA')
export const setLoggerPageSensor = createAction('SET_LOGGER_PAGE_SENSOR')
export const setSummaryData = createAction('SET_SUMMARY_DATA')


export const getSummary = (start, end) => async (dispatch, getState) => {
  try {
    dispatch(app.addSubmitForm('get-summary'))
    const res = await axios.get('/vmn-logger/summary', {
      params: {
        start, end
      }
    })
    dispatch(setSummaryData(res.data))
  }
  catch (ex) {

  }
  dispatch(app.deleteSubmitForm('get-summary'))
}

export const getLog = ({ start, end, interval, station }) => async (
  dispatch: Function,
  getState: Function,
) => {
  try {
    const res = await axios.get('/vmn-logger/interval', {
      params: {
        interval,
        start: start.format('YYYY-MM-DD'),
        end: end.format('YYYY-MM-DD'),
        station,
      },
    })
    dispatch(setLoggerPageData(res.data))
    notification.open({
      type: 'success',
      message: 'Get data logger success',
      description: 'found: ' + res.data.length + ' records.',
    })
  } catch (ex) {
    notification.open({
      type: 'error',
      message: 'Error message',
      description: ex.message,
    })
  }
}

const initState = {
  loggerPage: [],
  sensor: 'ec',
  summary: []
}

export default createReducer(
  {
    [setLoggerPageData]: (state, loggerPage) => ({ ...state, loggerPage }),
    [setLoggerPageSensor]: (state, sensor) => ({ ...state, sensor }),
    [setSummaryData]: (state, data) => {
      state.summary = data;
      return state
    },
  },
  initState,
)
