/* eslint-disable import/first */
import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import * as actions from './actions/LoginActions'
import * as sessionActions from './actions/SessionActions'
import store from './reducers/Store'
import {init as analytics} from './utils/analytics/autotrack'
import Loadable from 'react-loadable';
import NotFoundPage from './components/common/NotFoundPage'
import LoadHandler from './components/common/LoadingScreen'

const AsyncAbout = Loadable({
  loader: () => import('./routes/About'),
  loading: LoadHandler
});
const AsyncHome = Loadable({
  loader: () => import('./routes/Home'),
  loading: LoadHandler
});
const AsyncEvent = Loadable({
  loader: () => import('./routes/Event'),
  loading: LoadHandler
});


import Navigation from './components/Navigation'

class App extends Component {
   
     state = {
         didCheckLogin: false,
     }

     componentWillMount() {
         // Setup custom analytics
         analytics()
         this.props.setGeoSession()
     }


     checkForLogin = (nextState, replace) => {
       if (!this.state.didCheckLogin) {
         this.setState({
           didCheckLogin: true,
           checking: true,
         }, this.props.checkForLogin())
       }
     }


      render(){
        return  ( 
          <Router>
            <Navigation>
              <Switch>
                <Route exact path="/" component={AsyncHome}/>
                <Route exact path="/about" component={AsyncAbout}/>
                <Route exact path="/event/:id/:hash" component={AsyncEvent}/>
                <Route component={NotFoundPage}/>
              </Switch>
            </Navigation>
          </Router>
          )
      }
}


function mapStateToProps(state, ownprops) {
  return {
    loggedIn: state.login.status.signedIn,
    profile: state.login.profile
  }
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    checkForLogin: (route) => dispatch(actions.checkForLogin(route)),
    setGeoSession: () => dispatch(sessionActions.setGeodata())
  }
}

const SmartApp = connect(mapStateToProps, mapDispatchToProps)(App)

var reduxMiddleware

if (process.env.NODE_ENV === "development"){
  reduxMiddleware = applyMiddleware(thunkMiddleware, logger)
}else{
  reduxMiddleware = applyMiddleware(thunkMiddleware)
}

let appStore = createStore(store,reduxMiddleware)

export default props => (
  <Provider store={appStore}>
    <SmartApp {...props}/>
  </Provider>
)
