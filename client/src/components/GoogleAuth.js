import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn, signOut} from '../actions'

export class GoogleAuth extends Component {

    componentDidMount(){
        // available through the window scope in the browser
        //initialize oauth library one time
        window.gapi.load('client:auth2',()=>{
            // callback function to account for the signal or notification that the load is complete. it is not an async call and therefore does not return a promise
            window.gapi.client.init({
                clientId:'801328471355-k26tmp2pj5n3qt91cb3fngsgah54erja.apps.googleusercontent.com',
                // specify the different scopes that you want to load up when the user goes through the Oauth process, scope is basically which aspects of the user account you want access to.
                scope:'email'
            })
            // window.gapi.client.init is a async call so you utilize .then for the returned promise indicating that the client library has been initialized. the arrow function will then be invoked
            .then(()=>{
                //grab the auth object from the getAuthInstance method to allow you to sign in or to test if the client is signed in
                this.auth= window.gapi.auth2.getAuthInstance()
                // update the auth state in the redux store by calling the action creator and passing it to the reducer as to whether or not the user is signed in passing in the the auth object that we just initialized into the onAuthChange function below.
                this.onAuthChange(this.auth.isSignedIn.get())
                // event listener that will call the onAuthChange callback function if signedin status is changed
                // this is is needed because when the state is only updated after a refresh, the only thing that is changed when you log out or login after the app is loaded is the state server side. the listen method below allows you to update the state in the current component by calling onAuthChange
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }
    // when called this updates the sign in state which will allow for a realtime render and eliminate having to refresh
    // when the function is a callback use an arrow function bounds the context to the component
    //auth.isSignedIn.get will be received as an argument in the isSignedIn parameter which will be a boolean
    onAuthChange = (isSignedIn) =>{
        if(isSignedIn){
            // this will access the action creator to indicate that the user is signed in or out
            // pass in the id of the user that is automatcially created by google when you create an account, into the action creator
            this.props.signIn(this.auth.currentUser.get().getId())
        }
        else{
            this.props.signOut()
        }
    }
    // when the function is a callback use an arrow function bounds the context to the component
    onSignInClick = ()=>{
        // access the authinstance use the signin method
        this.auth.signIn()
    }
    // when the function is a callback use an arrow function bounds the context to the component
    onSignOutClick = ()=>{
        // access the authinstance use the signout method
        this.auth.signOut()
    }


    // helper method to determine if user is signed in
    renderAuthButton(){
        //state is from props, it will indicate on the button what to render
        if(this.props.isSignedIn===null){
            return null
        }
        else if(this.props.isSignedIn){
            return (
            <button onClick={this.onSignOutClick} className='ui red google button'>
                <i className="google icon"/>
                Sign Out
            </button>
                )
        }
        else{
            return (
            <button onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon"/>
                Sign in with Google
            </button>
                )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        // the isSignedIn state is located in the combineReducers as auth
        isSignedIn:state.auth.isSignedIn
    }
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth)
