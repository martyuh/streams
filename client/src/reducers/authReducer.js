import {SIGN_IN,SIGN_OUT} from '../actions/types'

const INITIAL_STATE = {
     isSignedIn:null,

     userId:null
}
// when the app initially loads the reducer gets called and is sent an undefined state, the default state will be set in its place 
 const authReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case SIGN_IN:
            // id assigned by google passed into action creator and updated in the reducer
            return { ...state, isSignedIn:true,userId:action.payload };
        case SIGN_OUT:
            // if user logs out revert userId back to null
            return { ...state, isSignedIn:false, userId:null }
        default:
            return state;
    }
}

export default authReducer