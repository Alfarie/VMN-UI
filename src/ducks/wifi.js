import { createReducer, createAction } from 'redux-act'
import axios from 'lib/axios'
import { push } from 'react-router-redux'
import { notification } from 'antd'
import * as app from './app'

export const STARTAP_REDUCER = 'startap'
export const STARTSTA_REDUCER = 'startsta'
export const REFRESH_WIFI_REDUCER = 'refreshwifi'

export const setWifiList = createAction('WIFI_SET_WIFI_LIST')
export const startAp = (ssid, password) => async (dispatch, getState) => {
  try {
    dispatch(app.addSubmitForm('startap'))
    const res = await axios.post('/wifi/apmode', { ssid, password })
    setTimeout(() => {
      dispatch(
        app.setStatusPage({
          title: 'Access Point Mode',
          description: 'Please wait for 1-5 minutes. Wi-Fi system is initializing....',
        }),
      )
      dispatch(push('/page/status'))
      dispatch(app.deleteSubmitForm('startap'))
    }, 3000)
  } catch (ex) {
    console.error(ex)
  }
}

export const startSta = (ssid, password) => async (dispatch, getState) => {
  dispatch(app.addSubmitForm(STARTSTA_REDUCER))
  try {
    const res = await axios.post('/wifi/stamode', { ssid, password })
    setTimeout(() => {
      dispatch(
        app.setStatusPage({
          title: 'Station Mode',
          description: 'Please wait for 1-5 minutes. Wi-Fi system is initializing....',
        }),
      )
      dispatch(push('/page/status'))
      dispatch(app.deleteSubmitForm(STARTSTA_REDUCER))
    }, 3000)
  } catch (ex) {
    console.error(ex)
  }
}

export const getWifi = () => async (dispatch, getState) => {
  dispatch(app.addSubmitForm(REFRESH_WIFI_REDUCER))
  try {
    const res = await axios.get('/wifi/scan')

    const { data } = res.data
    dispatch(setWifiList(data))
    setTimeout(() => {
      dispatch(app.deleteSubmitForm(REFRESH_WIFI_REDUCER))
    }, 3000)
  } catch (ex) {
    console.error(ex)
    notification.open({
      type: 'error',
      message: 'Error.',
      description: ex.message,
    })
  }
}

const initState = {
  wifiList: [],
}

export default createReducer(
  {
    [setWifiList]: (state, wifiList) => ({ ...state, wifiList }),
  },
  initState,
)
