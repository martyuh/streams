import React, {useEffect} from 'react'
import history from '../../history'
import Modal from '../Modal'
import {fetchStream,deleteStreams} from '../../actions'
import {connect} from 'react-redux'
import { mapKeys } from 'lodash'
import {Link} from 'react-router-dom'

const StreamDelete = (props) => {

    useEffect(()=>{
        // component makes a call to the redux store using the action creator in order to set the object to the stream that was selected. without this the stream selected will be undefined because it is making a call to an empty object
        props.fetchStream(props.match.params.id)
    },[])

    const onDelete =()=>{
        props.deleteStreams(props.match.params.id)
       
    }

    // customized buttons passed to modal
    const renderActions=()=>{
        return( 
        <React.Fragment>
            <button onClick={onDelete} className="ui button negative">Delete</button>
            {/* <button onClick={()=>history.push('/')}className="ui button">Cancel</button> */}
            {/* use link instead of button and history */}
            <Link to='/' className="ui button">Cancel</Link>
        </React.Fragment>
    )}

    const renderContent = () =>{
        return !props.stream?'Are you sure you want to delete this stream':`Are you sure you want to delete stream with the title: ${props.stream.title}?`
    }

    return (
    // do not need a wrapping element because modal is using a portal to sit in a modal div below the root div
             //pass in props into customizable modal 
            <Modal 
            title='Delete Stream'
            // make sure to call it we are not passing a reference, we're calling it and passing it to the prop
            content={renderContent()}
            // make sure to call it we are not passing a reference, we're calling it and passing it to the prop
            actions={renderActions()}
            onDismiss={() => history.push('/')}
            />
        
    )
}
//  ownProps provides access to history in props
const mapStateToProps = (state,ownProps)=>{
    return{
        // selects the specific stream out of the object with all the streams by grabbing it via the id
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps,{fetchStream,deleteStreams})(StreamDelete)
