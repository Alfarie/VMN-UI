import { createReducer, createAction } from 'redux-act'
import axios from '../lib/axios'
import * as app from './app'
import { notification } from 'antd'
const REDUCER = 'operation'
const NS = `@@${REDUCER}/`

export const setOperation = createAction(`${NS}SET_OPERATION`)

const initState = {
  operation: {
    'operator-name': 'Adward local',
    'crop-name': 'Local Plant',
    'measurement-time': ['06:00', '17:00'],
  },
  'supply-water': [0, 0, 0, 0],
  'number-plant': [0, 0, 0, 0, 0, 0, 0, 0],
  'number-drippers': [0, 0, 0, 0, 0, 0, 0, 0],
  'water-flow': [0, 0, 0, 0, 0, 0, 0, 0],
}

export const getOperation = () => async (dispatch, getState) => {
  const res = await axios.get('/operation')
  dispatch(setOperation(res.data))
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
    // console.log(res.data);

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
  },
  initState,
)
