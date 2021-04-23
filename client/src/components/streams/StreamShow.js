 import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchStream} from '../../actions'
import {useSelector,useDispatch} from 'react-redux'

const StreamShow = (props) => {
    const dispatch = useDispatch()
    useEffect(()=>{
                // component makes a call to the redux store using the action creator in order to set the object to the stream that was selected. without this the stream selected will be undefined because it is making a call to an empty object
            // usedispatch functions as matchdispatchtoprops
        dispatch(fetchStream(props.match.params.id))
    },[])
    // useSelector functions as mapstatetoprops by grabbing the state
    const stream= useSelector(state=>state.streams[props.match.params.id])
    
    // if statement can be outside of function
    if(!stream){
        // a return statement renders the component jsx can be returned anywhere within a functional component
        return <div>Loading...</div>
    }//once redux loads with fetchstream,the component rerenders and stream will be available. that is when destructuring will be possible and stream will be defined and the return statement below will be returned with jsx
       const {title, description} =stream
       
    return (
            <div>
            <h1>{title}</h1>
            <h5>{description}</h5>
            </div>
    )
}

//  ownProps provides access to history in props
// const mapStateToProps = (state,ownProps) =>{
//     return{
//         // selects the specific stream out of the object with all the streams by grabbing it via the id
//         stream: state.streams[ownProps.match.params.id]
//     }
// }

export default StreamShow
