import {combineReducers} from 'redux';
import { LoginReducer } from './Reducer/LoginReducer';
import { authReducer } from './Reducer/authReducer';
import { CheckReducer } from './Reducer/checkReducer';


export default combineReducers({
  login:LoginReducer,
  auth:authReducer,
  check:CheckReducer
})