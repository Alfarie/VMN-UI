import { createReducer } from 'redux-act'
import * as app from './app'
import { message } from 'antd'
import {push} from 'react-router-redux'

export const REDUCER = 'login'
export const submit = ({ username, password }: { username: string, password: string }) => async (
  dispatch: Function,
  getState: Function,
) => {
  dispatch(app.addSubmitForm(REDUCER))
  let isLoggined = await app.login(username, password, dispatch)
  
  if (isLoggined) {
    dispatch(loginFail(false))
    dispatch(app.deleteSubmitForm(REDUCER))
    setTimeout(()=>{
      dispatch(app.resetHideLogin())
    },2000);
  } 
  else {
    dispatch(loginFail(true))
    dispatch(app.deleteSubmitForm(REDUCER))
    message.error('Invalid username or password')
  }
}

export const loginFail = (value)=> (dispatch, getState)=>{
  if(value) dispatch(app.addSubmitForm('LOGIN_FAIL'))
  else dispatch(app.deleteSubmitForm('LOGIN_FAIL'))  
}

const initialState = {}
export default createReducer({}, initialState)