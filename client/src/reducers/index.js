import {combineReducers} from 'redux'
import authReducer from './authReducer'
import {reducer as formReducer } from 'redux-form'
import streamReducer from './streamReducer'

export default combineReducers({
    auth:authReducer,
    // form reducer automatically created from redux-form library
    form: formReducer,
    // manages adding, updating, editing and deleting the streams
    streams: streamReducer
})