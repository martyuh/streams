import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import Header from './Header'
import StreamCreate from './streams/StreamCreate'
import StreamDelete from './streams/StreamDelete'
import StreamEdit from './streams/StreamEdit'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import history from '../history'

// 801328471355-k26tmp2pj5n3qt91cb3fngsgah54erja.apps.googleusercontent.com

const App = () => {
    return (
        <div className = 'ui container'>
        {/*instead of browserrouter use plain custom router  with custom history object this will allow you to do programmatic navigation in the actioncreator*/}
            <Router history={history}>
                <div>
                {/* to continuously show the header it should be in the app component and not in a Route */}
                <Header/>
                    <Switch>
                        <Route path='/' exact component={StreamList}/>
                        <Route path='/streams/new' component={StreamCreate}/>
                        {/*the colon is the aspect that makes it so that id is a variable to allow for any id */}
                        <Route path='/streams/edit/:id' component={StreamEdit}/>
                        <Route path='/streams/delete/:id' component={StreamDelete}/>
                        <Route path='/streams/show/:id' component={StreamShow}/>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App
