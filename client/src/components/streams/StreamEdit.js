import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchStream, editStream} from '../../actions'
import StreamForm from './StreamForm'
import _ from 'lodash'

// because this component is rendered by route react-router-dom will pass all it props to it
// streamlist passes the id to the route and the route passes it to streamedit
// the number is what is reflected for id because route recognizes that a number was passed to the id in route.
const StreamEdit = (props) => {

    useEffect(()=>{
        // component makes a call to the redux store using the action creator in order to set the object to the stream that was selected. without this the stream selected will be undefined because it is making a call to an empty object
        props.fetchStream(props.match.params.id)
    },[])

    //callback for streamForm
    // this will be passed in formvalues from the fields in the createform component
    //formvalues are passed in from the field
    const onSubmit = (formvalues) => {
        props.editStream(props.match.params.id,formvalues)
    }

    return (        
        /* you see undefined for props.stream because during the initial render redux reducer is set to it's default state. which is this case is an empty object */
        // makes sure stream is loaded
        <div>
        {/* {props.stream&&<div>{props.stream.title}</div>} */}
        {!props.stream?<div>...Loading</div>:
        <div>
        <h3>Edit a Stream</h3>
        <StreamForm
        // pass in initialValues which is a special and specific prop to reduxform. this prop will allow you to pass in an object that allows you to match the name prop in the fields of StreamForm to the keys provided by the object and will subsequently place the strings value of those properties in the input fields that correspond with them
        // initialValues={{title:props.stream.title, description:props.stream.description}}
        // cleaner approach below below because the stream object contains the title and description property
        // initialValues={props.stream}
        // use lodash to grab properties from the stream object for the initial values and returns them as an object
        initialValues = {_.pick(props.stream,'title','description')}
        onSubmit={onSubmit}/>
        </div>}
        </div>
    )
}
//  ownProps provides access to history in props
const mapStateToProps = (state,ownProps) =>{
    return{
        // selects the specific stream out of the object with all the streams by grabbing it via the id
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps,{fetchStream,editStream})(StreamEdit)
