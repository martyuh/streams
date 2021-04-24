 import React, {useEffect, useRef,useState} from 'react'

import {fetchStream} from '../../actions'
import {useSelector,useDispatch} from 'react-redux'
// for video
import flv from 'flv.js'

const StreamShow = (props) => {

    // useref to point to element in the dom
    const videoRef = useRef(null)
    // destructure id from props.match.params
   
    const dispatch = useDispatch()
    // useSelector functions as mapstatetoprops by grabbing the state
    const stream= useSelector(state=>state.streams[props.match.params.id])

    // set the player in local state
    const [playerCreated,setPlayerCreated] = useState(null)
    const {id} = props.match.params
    useEffect(()=>{ 
                // component makes a call to the redux store using the action creator in order to set the object to the stream that was selected. without this the stream selected will be undefined because it is making a call to an empty object
            // usedispatch functions as matchdispatchtoprops
        dispatch(fetchStream(id))

    },[])

    useEffect(() => {
        if (playerCreated) {

            //returning a function in a useEffect hook means ~"please run this when unmounting" 

            return () => {
                playerCreated.destroy();
                setPlayerCreated(false)
            };
        }
    }, [playerCreated]);

    useEffect(() => {

        //videoRef.current will be null on first render - when the stream is set, so is the ref and therefore safe to use.
        if (stream && !playerCreated) {

            const player = flv.createPlayer({
                type: 'flv',
                url: `http://localhost:8000/live/${stream.id}.flv`
            });

            setPlayerCreated(player);

            //timeout after, or promise wrapping flv.createPlayer is needed, 
            // else the attachMediaElement is running to quick and video is not displayed
            // tried another solution , to put this in another useEffect
            // - but it doesn't work either.. it is a timing issue
            setTimeout(() => {
                player.attachMediaElement(videoRef.current);
                player.load();

            }, 500);

        }

        /*        
           listen for 'stream' to be updated and then render again, 
           needed as videoRef.current is null on first render
        */
    }, [stream]);


    //setup the function to return back to useEffect if the player or the stream do not exist yet
    // once stream updates the state in the store, the component will render, and because stream is present in state the video element with ref will render properly 
    // if player is present(it can only be present of the video element is rendered) the code below the if statement will not have to be run
    // const buildPlayer = () =>{
    //     if(!stream||player){
    //         return
    //     }
    //     const {id} = props.match.params
    //             // create an options object and assign it to a variable
    //             let player = flv.createPlayer({
    //                 type:'flv',
    //                 // streamname will be the id of the stream that you're looking at
    //                 url:`http://localhost:8000/live/${id}.flv`
    //             })
    //             // call attachmediaelement pass into the actual video element
    //             player.attachMediaElement(videoRef.current)
    //             // load up the player
    //             player.load()
    // }


    
    // if statement can be outside of function
    // when we don't have the stream we are not rendering the video element at all which means the video element is never created and the ref is never attached to it
    // video can be fetched if you navigate over, but during the refresh it will return an error because ofe scenario listed in the previous statement.
    if(!stream){
        // a return statement renders the component jsx can be returned anywhere within a functional component
        return <div>Loading...</div>
    }//once redux loads with fetchstream,the component rerenders and stream will be available. that is when destructuring will be possible and stream will be defined and the return statement below will be returned with jsx
       const {title, description} =stream
       
    return (
            <div>
            {/* created a useRef. pass it to this video element to target it in the dom */}
            {/* if you pass a prop down to a component and it has a value of true you can just write down the prop */}
            <video ref={videoRef} style={{width:'100%'}} controls/>
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
