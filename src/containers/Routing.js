import React, { PropTypes } from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Signup from '../components/pages/Signup'
import User from './User'
import HowItWorks from '../components/pages/HowItWorks'
import Terms from '../components/pages/Terms'
import Agreements from '../components/pages/terms/Agreements'
import Privacy from '../components/pages/terms/Privacy'
import Review from '../components/blocks/ReviewForm'
import Navigation from './Navigation'
import Profile from './Profile'
import Preferences from './Preferences'
import Gigs from './Gigs'
import Events from './Events'
import Reviews from './Reviews'
import Home from '../containers/Home'
import Event from './Event'
import EventInformation from '../components/blocks/Event'
import CustomerProfile from '../components/pages/CustomerProfile'
import Offers from '../components/pages/EventOffers'
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as actions from '../actions/LoginActions'
import store from '../reducers/Store'
import AuthService from '../utils/AuthService'

const auth = new AuthService()


var router = React.createClass({

  propTypes: {
     loggedIn: PropTypes.bool,
     checkForLogin: PropTypes.func.isRequired,
   },
   getInitialState() {
     return{
       didCheckLogin: false,
     }
   },

   componentWillMount() {

   },

   checkForLogin(nextState, replace){
     if (!this.state.didCheckLogin) {
       this.setState({
         didCheckLogin: true,
         checking: true,
       }, this.props.checkForLogin(nextState.location.pathname))

     }
    },

 redirectNotAuth(nextState, replace){
      if (!auth.loggedIn()) {
        replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  },


  render() {
    return(
      <Router
        //onUpdate={(e) => {window.scrollTo(0, 0)}}
        history={browserHistory}
      >
        <Route path="/" component={Navigation} onEnter={this.checkForLogin}>

          <IndexRoute component={Home}/>

          <Route component={User} onEnter={this.redirectNotAuth}>
            <Route path="profile" component={Profile}/>
            <Route path="gigs" component={Gigs}/>
            <Route path="events" component={Events}/>
            <Route path="reviews" component={Reviews}/>
            <Route path="preferences" component={Preferences}/>
            <Route path="user/signup" component={Signup}/>
          </Route>

          <Route path="event/:id/:hash" component={Event}>
            <IndexRoute  component={EventInformation}/>
            <Route path="user" component={CustomerProfile}/>
            <Route path="review" component={Review}/>
            <Route path="offers" component={Offers}/>

          </Route>

          <Route path="howitworks" component={HowItWorks}/>
          <Route path="signup" component={Signup}/>
          <Route path="terms" component={Terms}>
            <IndexRoute  component={Agreements}/>
            <Route path="agreements" component={Agreements}/>
            <Route path="privacy" component={Privacy}/>
          </Route>

        </Route>
      </Router>
)
}
})

function mapStateToProps(state, ownprops) {
  return {
    loggedIn: state.user.status.signedIn,
    profile: state.user.profile
  }
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    checkForLogin: (route) => dispatch(actions.checkForLogin(route)),
  }
}

const SmartRouter = connect(mapStateToProps, mapDispatchToProps)(router)
const reduxMiddleware = applyMiddleware(thunkMiddleware, createLogger())

let appStore = createStore(store,reduxMiddleware)
console.log(appStore.getState())

export default props => (
  <Provider store={appStore}>
    <SmartRouter {...props}/>
  </Provider>
)
