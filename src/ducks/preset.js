import { createReducer, createAction } from 'redux-act'
import axios from '../lib/axios'
import * as app from './app'
import { notification } from 'antd'
import moment from 'moment'
const REDUCER = 'operation'
const NS = `@@${REDUCER}/`

export const setPreset = createAction(`${NS}SET_OPERATION`)

const initState = [
  {
    data: {
      ch: 1,
      mode: 0,
      sensor: 0,
      manual: {
        status: 0,
      },
      timer: {
        size: 3,
        mode: 0,
        list: [[0, 60], [120, 180], [300, 360]],
      },
      irrigation: {
        soil_upper: 60,
        soil_lower: 40,
        soil_detecting: 30,
        soil_working: 15,
        par_soil_setpoint: 50,
        par_detecting: 30,
        par_working: 15,
        par_acc: 1.5,
        mode: 1,
        limit_time: 3,
        descent_rate: 0.2,
      },
      dfirrigation: {
        upper: 60,
        lower: 40,
        paracc: 1,
        working: 15,
        descent: 50,
      },
      advcond: {
        timer_list: [],
        timer_size: 0,
        timer_flag: false,
        sensor_condition: 3,
        sensor_setpoint: 30,
        sensor_flag: false,
        sensor_direction: 0,
        sensor: 5,
        setpoint: 600,
        working: 15,
        detecting: 30,
        direction: 0,
      },
      advsb: {
        timer_list: [],
        timer_size: 0,
        timer_flag: false,
        sensor_condition: 3,
        sensor_setpoint: 30,
        sensor_flag: false,
        sensor_direction: 0,
        sensor: 5,
        upper: 2000,
        lower: 1500,
        direction: 0,
      },
      advsbt: {
        timer_list: [],
        timer_size: 0,
        timer_flag: false,
        sensor_condition: 3,
        sensor_setpoint: 30,
        sensor_flag: false,
        sensor_direction: 0,
        sensor: 5,
        upper: 2000,
        lower: 1500,
        working: 10,
        detecting: 10,
        direction: 0,
      },
    },
    name: 'Preset 1',
  },
]

export const getPreset = () => async (dispatch, getState) => {
  const res = await axios.get('/preset')
  console.log('res: ', res.data)
  dispatch(setPreset(res.data))
}

export const _setPreset = payload => async (dispatch, getState) => {
  try {
    dispatch(app.addSubmitForm('preset'))
    const { preset } = getState()
    const res = await axios.post('/preset', preset)
    console.log(res.data)

    setTimeout(() => {
      dispatch(app.deleteSubmitForm('preset'))
      notification.open({
        type: 'success',
        message: 'VMN Operation updated',
        description: 'Successful.',
      })
    }, 2000)
  } catch (ex) {
    console.error('ex: ', ex)
  }
}

export default createReducer(
  {
    [setPreset]: (state, payload) => [...payload],
  },
  initState,
)
