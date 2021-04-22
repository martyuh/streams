import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { StaticRouter } from 'react-router'
import {fetchStreams} from '../../actions'
import {Link} from 'react-router-dom'
// destructure props into fetchStreams function, and streams state
const StreamList = ({fetchStreams,streams,currentUserId,isSignedIn}) => {
 
    useEffect(()=>{
        fetchStreams()
    },[])

    // called by map in renderlist
    const renderAdmin = (stream) =>{
    //currently signed in and using the app, will cross reference with the userid assigned to each stream to determine if user created a particular stream if so, delete and edit buttons will be present
        if(stream.userId===currentUserId){
           return (
           <div className="right floated content">
               {/* <button className="ui button primary">Edit</button> */}
               {/* path reflects the current stream clicked on. route is adusted app component with id variable to allow for any clicked on stream.id  */}
               <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>Edit</Link>
               <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
           </div>
            )
        }

    }

    const renderList =()=>{
        return streams.map((stream)=>{
         return(
             <div className='item' key={stream.id}>
             {/* render the edit/delete buttons based on which user is signed in  */}
             {renderAdmin(stream)}
                 <i className="large middle aligned icon camera"/>
                 <div className="content">{stream.title}
                 <div className="description">{stream.description}</div>
                 </div>
                 
             </div>)   
        })
    }
    //to display the create button but only if the user is signed in
    const renderCreate =()=>{
        if(isSignedIn){
            return(
                <div style={{textAlign:'right'}}>
                    <Link to='/streams/new' className='ui button primary'>
                        Create Stream
                    </Link>
                </div>
            )
        }
    }

    return (
        <div>
        <h2>Streams</h2>
           <div className="ui celled list">{renderList()}</div> 
           {renderCreate()}
        </div>
    )
}

// convert the object passed into the component into an array by using Object.values. this is to make it easier to map out the object.

const mapStateToProps = (state) =>{
    return{
        // takes an object as
        streams: Object.values(state.streams),
        //currently signed in and using the app, will cross reference with the userid assigned to each stream to determine if user created a particular stream if so, delete and edit buttons will be present
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps,{fetchStreams})(StreamList)
