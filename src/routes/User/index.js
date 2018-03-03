import React, {Component} from 'react';
import {
  Switch, 
  Route
} from 'react-router';
import User from './components/pages/User'; 
import FinishSignup from './components/pages/FinishSignup'; 
import Profile from "./routes/Profile";
import Book from "./routes/Book";
import Events from "./routes/Events";
import Gigs from "./routes/Gigs";
import Preferences from "./routes/Preferences";
import Reviews from "./routes/Reviews";
import {localize, addTranslation} from 'react-localize-redux';
import content from './content.json';
import {store} from '../../store';

store.dispatch(addTranslation(content));

class Index extends Component{
  render(){
    const {match, translate} = this.props
    return(
      <Switch>
        <Route exact path={`${match.url}`} component={FinishSignup} />
        <Route path={`${match.url}/:permalink/`} render={(props)=>{
          return (
            <User {...this.props} {...props} >
              <Switch>
                <Route path={`${match.url}/:permalink/profile`} component={Profile} />
                <Route path={`${match.url}/:permalink/book`} component={Book} />
                <Route path={`${match.url}/:permalink/${translate("preferences")}`} component={Preferences} />
                <Route path={`${match.url}/:permalink/events`} component={Events} />
                <Route path={`${match.url}/:permalink/gigs`} component={Gigs} />
                <Route path={`${match.url}/:permalink/${translate("reviews")}`} component={Reviews} />
              </Switch>
            </User>
          )
        }}/>
      </Switch>
  
  )}
}

export default localize(Index, 'locale');
