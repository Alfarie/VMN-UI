import { createAction, createReducer } from 'redux-act'
import axios from 'lib/axios';
import { notification } from 'antd'
import * as app from './app'
const NS = 'CONTROL'


export const _getControl = () => async (dispatch, getState) => {
    const res = await axios.get('/control/')
    const control = res.data;
    dispatch(setControl(control));
}
export const _setControl = (control,ch) => (dispatch, getState)=>{
    dispatch(app.addSubmitForm('control'));
    axios.post('/control/', {control: control[ch-1]})
    dispatch(setControl(control));
    var msg = ""
    if(control[ch-1].mode === 0){
        msg = "Manual control updated!"
    }
    else if(control[ch-1].mode === 1){
        msg = "Timer control updated!"
    }
    setTimeout(() => {
        dispatch(app.deleteSubmitForm('control'));
        notification.open({
            type: 'success',
            message: msg,
            description:
              'Update successfull.',
          })
    }, 2000);
}

export const _setTask = (task)=> async (dispatch: Function, getState: Function)=>{
    dispatch(app.addSubmitForm('addtask'));

    try{
        const res = axios.post('/control/task', {task})
        dispatch(app.deleteSubmitForm('addtask'));
        notification.open({
            type: 'success',
            message: `Add task is successful`,
            description:
              `Add task on ch:${task.ch} for ${task.working} at ${task.datetime}`
          })
    }
    catch(ex){
        notification.open({
            type: 'fail',
            message: `Add task is fail`,
            description:
              `Network Error`
          })
        dispatch(app.deleteSubmitForm('addtask'));
    }
}
export const setControl = createAction(`${NS}_SET_CONTROL`)
export const setSelectedChannel = createAction(`${NS}_SET_SELECTED_CHANNEL`)

const control = [
    {
        "ch": 1,
        "mode": 1,
        "sensor": 1,
        "manual": {
            "status": 0
        },
        "timer": {
            "mode": 1,
            "list": [
                [
                    300,
                    120
                ],
                [
                    540,
                    120
                ],
                [
                    780,
                    120
                ],
                [
                    1020,
                    120
                ]
            ]
        },
        "irrigation": {
            "soil_upper": 60,
            "soil_lower": 40,
            "soil_detecting": 30,
            "soil_working": 15,
            "par_soil_setpoint": 50,
            "par_detecting": 30,
            "par_working": 15,
            "par_acc": 1.5,
            "mode": 1,
            "limit_time": 3,
            "descent_rate": 0.2
        },
        "dfirrigation": {
            "upper": 60,
            "lower": 40,
            "paracc": 1,
            "working": 15,
            "descent": 50
        },
        "advcond": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "setpoint": 600,
            "working": 15,
            "detecting": 30,
            "direction": 0
        },
        "advsb": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "upper": 2000,
            "lower": 1500,
            "direction": 0
        },
        "advsbt": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "upper": 2000,
            "lower": 1500,
            "working": 10,
            "detecting": 10,
            "direction": 0
        }
    },
    {
        "ch": 2,
        "mode": 0,
        "sensor": 1,
        "manual": {
            "status": 0
        },
        "timer": {
            "mode": 1,
            "list": [
                [
                    300,
                    120
                ],
                [
                    540,
                    120
                ],
                [
                    780,
                    120
                ],
                [
                    1020,
                    120
                ],
                [
                    1260,
                    120
                ]
            ]
        },
        "irrigation": {
            "soil_upper": 60,
            "soil_lower": 40,
            "soil_detecting": 30,
            "soil_working": 15,
            "par_soil_setpoint": 50,
            "par_detecting": 30,
            "par_working": 15,
            "par_acc": 1.5,
            "mode": 1,
            "limit_time": 3,
            "descent_rate": 0.2
        },
        "dfirrigation": {
            "upper": 60,
            "lower": 40,
            "paracc": 1,
            "working": 15,
            "descent": 50
        },
        "advcond": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "setpoint": 600,
            "working": 15,
            "detecting": 30,
            "direction": 0
        },
        "advsb": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "upper": 2000,
            "lower": 1500,
            "direction": 0
        },
        "advsbt": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "upper": 2000,
            "lower": 1500,
            "working": 10,
            "detecting": 10,
            "direction": 0
        }
    },
    {
        "ch": 3,
        "mode": 0,
        "sensor": 1,
        "manual": {
            "status": 0
        },
        "timer": {
            "mode": 1,
            "list": [
                [
                    300,
                    120
                ],
                [
                    540,
                    120
                ],
                [
                    780,
                    120
                ],
                [
                    1020,
                    120
                ],
                [
                    1260,
                    120
                ]
            ]
        },
        "irrigation": {
            "soil_upper": 60,
            "soil_lower": 40,
            "soil_detecting": 30,
            "soil_working": 15,
            "par_soil_setpoint": 50,
            "par_detecting": 30,
            "par_working": 15,
            "par_acc": 1.5,
            "mode": 1,
            "limit_time": 3,
            "descent_rate": 0.2
        },
        "dfirrigation": {
            "upper": 60,
            "lower": 40,
            "paracc": 1,
            "working": 15,
            "descent": 50
        },
        "advcond": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "setpoint": 600,
            "working": 15,
            "detecting": 30,
            "direction": 0
        },
        "advsb": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "upper": 2000,
            "lower": 1500,
            "direction": 0
        },
        "advsbt": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "upper": 2000,
            "lower": 1500,
            "working": 10,
            "detecting": 10,
            "direction": 0
        }
    },
    {
        "ch": 4,
        "mode": 0,
        "sensor": 1,
        "manual": {
            "status": 0
        },
        "timer": {
            "mode": 1,
            "list": [
                [
                    300,
                    120
                ],
                [
                    540,
                    120
                ],
                [
                    780,
                    120
                ],
                [
                    1020,
                    120
                ],
                [
                    1260,
                    120
                ]
            ]
        },
        "irrigation": {
            "soil_upper": 60,
            "soil_lower": 40,
            "soil_detecting": 30,
            "soil_working": 15,
            "par_soil_setpoint": 50,
            "par_detecting": 30,
            "par_working": 15,
            "par_acc": 1.5,
            "mode": 1,
            "limit_time": 3,
            "descent_rate": 0.2
        },
        "dfirrigation": {
            "upper": 60,
            "lower": 40,
            "paracc": 1,
            "working": 15,
            "descent": 50
        },
        "advcond": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "setpoint": 600,
            "working": 15,
            "detecting": 30,
            "direction": 0
        },
        "advsb": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "upper": 2000,
            "lower": 1500,
            "direction": 0
        },
        "advsbt": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "upper": 2000,
            "lower": 1500,
            "working": 10,
            "detecting": 10,
            "direction": 0
        }
    }
]

const initState = {
    control: control,
    selectedChannel: 1
}
export default createReducer({
    [setControl]: (state, control)=> { 
        return {...state,control}
    },
    [setSelectedChannel]: (state, payload)=>{
        return {...state, ...payload}
    }
},initState)