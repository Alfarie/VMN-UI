import { createReducer, createAction } from 'redux-act'
import axios from '../lib/axios'
import * as app from './app'
import { notification } from 'antd'
import moment from 'moment'
const REDUCER = 'operation'
const NS = `@@${REDUCER}/`

export const setOperation = createAction(`${NS}SET_OPERATION`)
export const setSupply = createAction(`${NS}SET_SUPPLY`)

const initState = {
  totalSupply: [0, 0, 0, 0, 0, 0, 0, 0],
  currentSupply: [0, 0, 0, 0, 0, 0, 0, 0],
  operation: {
    'operator-name': 'Adward local',
    'crop-name': 'Local Plant',
    'measurement-time': ['06:00', '17:00'],
  },
  'supply-water': [200, 0, 0, 0],
  'number-plant': [10, 10, 10, 10, 10, 10, 10, 10],
  'number-drippers': [10, 10, 10, 10, 10, 10, 10, 10],
  'water-flow': [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
  'station-name': ['A1', 'B1', 'A2', 'B2', 'A3', 'B3', 'A4', 'B4'],
}

export const getOperation = () => async (dispatch, getState) => {
  const res = await axios.get('/operation')
  console.log(res)
  dispatch(setOperation(res.data))
}
export const supplyCalculation = () => async (dispatch, getState) => {
  let data = await Promise.all([axios.get('/operation'), axios.get('/control')])
  const operation = data[0].data
  const control = data[1].data
  let flowRate = operation['water-flow']

  const flowRateLS = flowRate.map(flow => flow * 0.000277777778)

  // total consume calculation
  var totalSecond = control.map(ctrl => {
    var second = 0
    ctrl.timer.list.forEach((list, index) => {
      second += list[1]
    })
    return [second, second]
  })
  totalSecond = JSON.parse('[' + totalSecond.join() + ']')
  var totalSupply = [0, 0, 0, 0, 0, 0, 0, 0]

  for (var i = 0; i < totalSupply.length; i += 1) {
    totalSupply[i] = totalSecond[i] * flowRateLS[i] * 1000
  }

  // current consume calculation
  //get datetime to current min
  const currentTime = moment()
  const currentMin = currentTime.hour() * 60 + currentTime.minute()
  var currentSecond = control.map(ctrl => {
    var second = 0
    ctrl.timer.list.forEach((list, index) => {
      if (list[0] >= currentMin) return
      second += list[1]
    })
    return [second, second]
  })
  currentSecond = JSON.parse('[' + currentSecond.join() + ']')
  var currentSupply = [0, 0, 0, 0, 0, 0, 0, 0]
  for (i = 0; i < currentSupply.length; i += 1) {
    currentSupply[i] = currentSecond[i] * flowRateLS[i] * 1000
  }

  dispatch(setSupply({ currentSupply, totalSupply }))
}

export const setDateTime = ({ date, time }) => async (dispatch, getState) => {
  dispatch(app.addSubmitForm('datetime'))
  const res = await axios.post('/setting/datetime', { date, time })
  setTimeout(() => {
    dispatch(app.deleteSubmitForm('datetime'))
    notification.open({
      type: 'success',
      message: 'You have successfully set date and time',
      description: 'VMN DateTime has initialized.',
    })
  }, 2000)
}

export const _setOperation = payload => async (dispatch, getState) => {
  try {
    dispatch(app.addSubmitForm('operation'))
    dispatch(setOperation(payload))
    const { operation } = getState()
    const res = await axios.post('/operation', operation)
    console.log(res.data)

    setTimeout(() => {
      dispatch(app.deleteSubmitForm('operation'))
      notification.open({
        type: 'success',
        message: 'VMN Operation updated',
        description: 'Successful.',
      })
    }, 2000)
  } catch (ex) {
    console.error(ex)
  }
}

export default createReducer(
  {
    [setOperation]: (state, payload) => ({ ...state, ...payload }),
    [setSupply]: (state, payload) => ({ ...state, ...payload }),
  },
  initState,
)
