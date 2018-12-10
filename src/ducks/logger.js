import { createAction, createReducer } from 'redux-act'
import axios from 'lib/axios'
import {notification} from 'antd'
const setLoggerPageData = createAction('SET_LOGGER_PAGE_DATA');
export const setLoggerPageSensor = createAction('SET_LOGGER_PAGE_SENSOR');


export const getLog = ({
    start,end,interval,station
}) => async (dispatch: Function, getState: Function) => {
    try {
        const res = await axios.get('/vmn-logger/interval', {
            params: {
                interval,
                start: start.format('YYYY-MM-DD'),
                end: end.format('YYYY-MM-DD'),
                station
            }
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
            description: ex.message
          })
    }
}


const initState = {
    loggerPage: [],
    sensor: "ec"
}

export default createReducer({
    [setLoggerPageData]: (state, loggerPage) => ({ ...state, loggerPage }),
    [setLoggerPageSensor]: (state, sensor) => ({ ...state, sensor }),
    
},initState)