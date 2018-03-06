import React, {Component} from 'react'
import Navlink from '../../../../components/common/Navlink'
import EventNavigation from './EventNavigation'
import Notification from '../../../../components/common/Notification'
import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux'
class eventHeader extends Component{

   componentDidMount() {
     window.addEventListener('scroll', this.handleScroll)
   }

   componentWillUnmount(){
     window.removeEventListener('scroll', this.handleScroll)
     clearInterval(this.intervalID);
   }

   sttate={loadString:"..."}

  handleScroll = (event) => {
   let scrollTop = window.pageYOffset;
   if (scrollTop > 280) {
     this.eventHeader.className =  "user-header fixed"
   }else{
     this.eventHeader.className = "user-header"
   }
  }

  shouldComponentUpdate(){
    console.log("update yo")
    return true;
  }

  render() {
    const { translate } = this.props;
    return (
        <header ref={ref=>this.eventHeader=ref}
          className="user-header">
          <div id="stripes" className="v2">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <Notification message={this.props.notification}/>

          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center"
              }}
              className="row">

              {this.props.loggedIn ?
                <div className="back-button userNavigation">
                  <Navlink to={
                    translate("routes./user/:username/events",{
                      username: this.props.permaLink
                    })}
                    label="< Events"/>
                </div>
              :null}
              <div className="event-header-content col-sm-7">
                <div className="header-info">
                  <div className="user-name">
                    <h1>{this.props.loading || !this.props.event ? '' : translate("Welcome") + " " + this.props.event.contactName }</h1>
                  </div>
                  <div className="user-location">
                    <h2>

                      {this.props.loading || !this.props.event ? ''  : this.props.event.name }
                    </h2>
                  </div>
                </div>

                <div className="header-divider"/>
                {this.props.loading || !this.props.event ? null :
                  <EventNavigation
                    paid={this.props.event.chosenOfferId !== 0}
                    hash={this.props.hash}
                    isFinished={this.props.event.status === "Finished"}
                    id={this.props.event.id}
                  />
                }
              </div>
            </div>
          </div>

        </header>
      )
  }
}

const mapStateToProps = state => ({ translate: getTranslate(state.locale) });

const SmartNavigation = connect(mapStateToProps, null, null, {pure:false})(eventHeader)

export default SmartNavigation;