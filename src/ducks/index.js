import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { pendingTasksReducer } from 'react-redux-spinner'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from 'history/createHashHistory'
import thunk from 'redux-thunk'

import app from './app'
import login from './login'
import operation from './vmn-operation'
import wifi from './wifi'
import realTime from './real-time'
import logger from './logger'
export const reducer =  combineReducers({
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  app,
  login,
  operation,
  wifi,
  realTime,
  logger
})

export const history = createHistory()
const router = routerMiddleware(history)
const middlewares = [router, thunk]
const isLogger = false
if (isLogger && process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)))
