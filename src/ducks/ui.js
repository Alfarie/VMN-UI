import { createReducer, createAction } from 'redux-act'
import pkg from '../../package'

const initState = {
  version: pkg.version
}
export default createReducer(
  {},
  initState,
)
