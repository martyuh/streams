
import _ from 'lodash'
import {    
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../actions/types'
// the state will contain an object with the ids passed in for the keys.

// default empty object so that any thing can be added to the object, be it a single stream or a collection of streams
 const streamReducer = (state={},action) =>{
    switch(action.type){
        case FETCH_STREAMS:
            // use mapkeys from lodash to create a new object out of the the new list of strings passed in from the action. pass in the array and instruct mapkey to assign the id to create a key for each object/individual string in the new object.spread operator allows you to spread the new object created by mapkeys to the object returned by the reducer
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case FETCH_STREAM:
            return{
                //const newState={...state}
                // use property accessor notation to assign the new stream
                //newState[action.payload.id]=action.payload
                //return newState
                //code below using es6 is more concise
                // es6 format, bracket formatting allows for the id to be assigned the key. and to have the payload assigned to the key. this is called key interpolation
                ...state, [action.payload.id]:action.payload
            }
        case CREATE_STREAM:
            
            return{ ...state,[action.payload.id]:action.payload}
        case EDIT_STREAM:
            return{...state,[action.payload.id]:action.payload}
        case DELETE_STREAM:
            // use lodash to delete each stream. pass in state and the string of the key that you want to remove, in this case action.payload returns the id and will be deleted 
            return(_.omit(state,action.payload))
        default:
            return state;
    }
}
export default streamReducer