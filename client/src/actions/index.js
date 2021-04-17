// axios instance that the action creator will have access to
import axios from 'axios'
import { formValues } from 'redux-form'
import streams from '../apis/streams'
import history from '../history'

import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
    } from './types'
// id assigned by google passed into action creator and updated in the reducer
export const signIn = (userId) => {
    return{
        type: SIGN_IN,
        payload: userId
       
    }
}

export const signOut = (userId) =>{
    return{
        type: SIGN_OUT,
        
    }
}

//formvalues has list of all the values that we entered into the form as an argument
// because there'll be an async request to the api, use redux thunk to return an arrow function from our action creator which will pass through redux thunk. thunk will then dispatch action object after it processes the returned the function, and pass it to the reducer
// assign the user id from google authentication to the created stream 
//this will allow you to create a stream for that is specific to a user
// when you return an a function with thunk, thunk calls it with two arguments, dispatch and getState function, which allows you to reach into the redux store and pull out the state
export const createStream = (formValues) => async (dispatch,getState) =>{
// destructure userId out of getState.auth
const {userId} = getState().auth
//make a post to localhost3001 and put in your formvalues to create the stream
// add the unique id to the stream by creating an object to add the formvalues keyvalue pairs and adding userId to it, which is userid:userId in es6 format
 const response = await streams.post('/streams',{...formValues, userId})

 dispatch({
     type:CREATE_STREAM,
     payload: response.data
 })
 //after a stream is created,if the api returns a success, do some programmatic navigation to get the user back to the root route
// to programmatically navigate the user around utilize history.push('/') which will update the route/path and the url address. Push is essentially how you manually navigate a user around.
 history.push('/')
} 


export const fetchStreams = () =>async (dispatch) =>{
    
    const response  = await streams.get('/streams')
    
    dispatch({
        type:FETCH_STREAMS,
        payload: response.data
    })
}

export const fetchStream = (id) =>async dispatch =>{
    
    const response  = await streams.get(`/streams/${id}`)
    
    dispatch({
        type:FETCH_STREAM,
        payload: response.data
    })
}
// formvalues will contain the update to the stream
export const editStream = (id,formvalues) => async dispatch => {
    // formvalues will communicate the update
    const response = await streams.put(`/streams/${id}`,formvalues)
    
    dispatch({
        type:EDIT_STREAM,
        payload: response.data
    })
}

export const deleteStreams = (id) => async dispatch =>{
    await streams.delete(`/streams/${id}`)

    dispatch({
        type:DELETE_STREAM,
        payload: id
    })
}

