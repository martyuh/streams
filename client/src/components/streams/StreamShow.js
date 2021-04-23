import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchStream} from '../../actions'
import {useSelector,useDispatch} from 'react-redux'

const StreamShow = (props) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        
        dispatch(fetchStream(props.match.params.id))
    },[])

       
        const stream= useSelector(state=>{
            console.log(state)
            return state.streams[props.match.params.id]})
        
       
    return (
        <div>
            {!stream?<div>Loading...</div>:
            <div>
             {/* <h1>{title}</h1>
            <h5>{description}</h5> */}
            </div>}
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
