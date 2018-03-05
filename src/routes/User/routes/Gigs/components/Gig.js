import React, {Component} from 'react'
import TextWrapper from '../../../../../components/common/TextElement'
import {CollapsibleContainer, Collapsible} from '../../../../../components/common/Collapsible'
import OfferForm from './OfferForm'
import PayoutForm from '../../../../../components/common/PayoutForm'
import Popup from '../../../../../components/common/Popup'
import InfoPopup from '../../../../../components/common/InfoPopup'
import Chat from '../../../../../components/common/Chat'
import moment from 'moment-timezone'
import { connect } from 'react-redux'
import  * as actions from '../../../../../actions/GigActions'
import { localize } from 'react-localize-redux';

class Gig extends Component{
  state= {
      showPopup: false,
      gigStatus: "" 
    }
  
  componentWillMount(){
    this.setState({
      eventFinished: (this.props.gig.startTime.valueOf() - Date.now()) <= 0
    });
    this.setGigStatus();
  }

  setGigStatus = (props = this.props) => {
    const {translate} = this.props;

    if(this.timeLeft){
      clearInterval(this.timeLeft);
    }
    // Only autodeclines if the gig is not a direct booking,
    // and if the gig is still en request status,
    if(!props.gig.referred 
      && props.gig.status === "Requested" 
      && !!props.gig.createdAt
      && !!props.gig.startTime
      ){
      let createdAt = moment(props.gig.createdAt);
      let eventStartAt = moment(props.gig.startTime);
      let eventGigDifference = (eventStartAt.valueOf() - createdAt.valueOf())/1000;
    
      // and if gig is created more than 4 days before the event.
      if(eventGigDifference > (4*24*60*60)){
        // Calculate seconds until autodecline
        let now = new moment();
        let autoDeclineMoment = createdAt.add(3, 'days');
        let secondsToDecline = autoDeclineMoment.diff(now, 'seconds');
        
        this.timeLeft = setInterval(()=>{
          secondsToDecline--;
          let totalSeconds = secondsToDecline;

          if(totalSeconds <= 0){
            this.setState({
              expiring: false,
              gigStatus: translate("gig.messages.expired")
            })
          }else{
            let days =  Math.floor(totalSeconds / (24*60*60));
            totalSeconds %= (24*60*60);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);
            
            this.setState({
              expiring: true,
              gigStatus: `${translate("Make offer within")} ${!!days ? (days + " " + (days > 1 ? translate("days") : translate("day"))) : ''} ${!!hours ? (hours + " " + (hours > 1 ? translate("hours") : translate("hour"))) : ''} ${!!minutes ? (minutes + " " + (minutes > 1 ? translate("minutes") : translate("minute"))) : ''} ${!!seconds ? (seconds + " " + (seconds > 1 ? translate("seconds") : translate("second"))) : ''}`
            })
          }
        }, 1000)

        return;
        }
    }

    this.setState({
      gigStatus: props.gig.status === "Cancelled" ?
          translate("gig.messages.cancelled")    
          :props.gig.status === "Declined" ?
          translate("gig.messages.declined")    
          :props.gig.status === "Lost" ?
          translate("gig.messages.lost")    
          :props.gig.status === "Confirmed" ?
          translate("gig.messages.confirmed")    
          :props.gig.status === "Finished"  ?
          translate("gig.messages.finished")    
          : this.state.eventFinished ?
          translate("gig.messages.event-finished")    
          :props.gig.status === "Accepted" ?
          translate("gig.messages.accepted")    
          : props.gig.referred ? 
          translate("gig.messages.referred")    
          :props.gig.status === "Requested" ?
          translate("gig.messages.requested")
        : ""
    });
  
  }

  showPopup = () => {
    this.setState({
      showPopup: true,
    })
  }

  componentWillUnmount(){
    if(this.timeLeft){
      clearInterval(this.timeLeft);
    }
  }

  componentWillReceiveProps(nextprops){
    if(this.props.gig.status !== nextprops.gig.status){
      this.setGigStatus(nextprops);
    }
  }

  render() {
    const {translate} = this.props;
    var genres = ""
    const length = this.props.gig.genres.length
    this.props.gig.genres.forEach(function(genre, i) {
      if (i+1 === length) {
        genres += genre
      }else{
        genres = genres + genre + ", "
      }
    })
      return (
      
        <div>
          <Popup 
            showing={this.state.showPopup}
            onClickOutside={()=>this.setState({showPopup:false})}>
            <PayoutForm/>
          </Popup>  

          <div
            className="card gig"

          >


            <div className="col-xs-12">
              <div className="event-top">
                <div>
                  <div className="event-name">
                    {this.props.gig.name}
                  </div>
                  <div className="event-location">
                    <svg
                      version="1.1" id="Capa_1" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 466.583 466.582" style={{enableBackground: "new 0 0 466.583 466.582"}}>
                      <g>
                        <path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" />
                      </g>
                    </svg>
                    {" " + this.props.gig.location.name}
                  </div>
                </div>
                <div className="gig-from-now">
                  {this.props.gig.startTime.fromNow()}
                </div>
                <div className="gig-status" >
                  {this.state.gigStatus} 
                  {this.state.expiring ? 
                  <InfoPopup
                  info={
                    translate('gig.status-description')
                  }
                  />
                  : null}
                </div>
              </div>

              <CollapsibleContainer>






                <Collapsible
                  name="EventInfo"
                  label={translate('gig.event.info')}
                >

                  <p style={{marginBottom:"30px"}}>
                  {translate('gig.event.info-description')}
                  </p>
                  <TextWrapper
                    label={translate('date')}
                  >
                    <p>
                      {this.props.gig.startTime.format('dddd, MMMM Do YYYY')}
                    </p>
                  </TextWrapper>

                  <TextWrapper
                    label={translate('description')}
                  >
                    <p>
                      {this.props.gig.description}
                    </p>
                  </TextWrapper>
                  <TextWrapper
                    label={translate('guests')}

                  >
                    <p>
                    {translate(
                      "request-form.step-3.guests-description",
                      { 
                        prefix: this.props.gig.guestCount === 1000 ? translate('over') : translate('around'),
                        amount: this.props.gig.guestCount
                      })
                      }
                    </p>


                  </TextWrapper>
                </Collapsible>




                <Collapsible
                  name="Requirements"
                  label={translate("gig.event.requirements")}
                >

                  <TextWrapper
                    label={translate("equipment")}
                  >
                    <p>
                      {
                        this.props.gig.rider === "DJ"
                        ?
                        translate("gig.event.rider-dj")
                        : null
                      }
                       {
                        this.props.gig.rider === "DJ_AND_LIGHT"
                        ?
                        translate("gig.event.rider-lights")
                        : null
                      }
                      {
                        this.props.gig.rider === "DJ_AND_SPEAKERS"
                        ?
                        translate("gig.event.rider-speakers")
                        : null
                      }
                      {
                        this.props.gig.rider === "DJ_SPEAKERS_AND_LIGHT"
                        ?
                        translate("gig.event.rider-speakers-lights")
                        : null
                      }
                    </p>
                  </TextWrapper>


                  <TextWrapper
                    label={translate("duration")}

                  >
                    <p>
                      {translate("gig.event.duration-description", {
                        end: this.props.gig.endTime.format('HH:mm'),
                        start: this.props.gig.startTime.format('HH:mm')
                      })}
                    </p>
                  </TextWrapper>

                  <TextWrapper
                    label={translate("gig.event.genres")}>
                    <p>{genres}</p>

                  </TextWrapper>

                </Collapsible>

                {this.props.gig.status === "Lost" ? <div/> :
                <Collapsible
                  lazyLoad
                  name="ContactInfo"
                  label={
                    translate("gig.event.contact", {
                      unread: this.props.notification ? "(Unread message 📫)" : ""
                    })
                  }
                >                   
                  <p>
                    {translate("gig.event.contact-description", {name: this.props.gig.contactName})}
                    </p>
                      { this.props.gig.status === 'Confirmed' && this.props.payoutInfoValid ? 
                        <div>
                         { 
                           this.props.gig.contactPhone ?
                          <TextWrapper
                            label={translate("Phone number")}
                          >
                            <a href={"tel:"+this.props.gig.contactPhone}>{this.props.gig.contactPhone}</a>
                          </TextWrapper>
                          : null
                          }
                       
                          <TextWrapper
                            label="Email"
                          >
                            <a href={"mailto:"+this.props.gig.contactEmail}>{this.props.gig.contactEmail}</a>
                          </TextWrapper>
                          </div>
                          
                        : null  }
                      <Chat 
                        eventId={this.props.gig.eventID}
                        receiver={{
                          id:this.props.gig.customerID,
                          name:this.props.gig.contactName,
                          image:this.props.gig.customer.picture
                        }}
                        sender={{
                          id:this.props.profileId,
                          name:this.props.profileName,
                          image:this.props.profilePicture
                        }}
                        chatId={this.props.gig.id}
                        />
                </Collapsible>
                }



                {  ( this.props.gig.status === "Cancelled" ||
                    this.props.gig.status === "Declined" ||
                    this.props.gig.status === "Lost" ||
                    this.state.eventFinished ) ? <div/> :

                <Collapsible
                  name="Offer"
                  label={translate("Make offer")}
                >

                 <OfferForm 
                     showPopup={this.showPopup}
                     profileCurrency={this.props.profileCurrency}
                     gig={this.props.gig}
                  />

                </Collapsible>
                 }


              </CollapsibleContainer>
            </div>
          </div>
        </div>)

  }
}


function mapStateToProps(state, ownProps){
  return {
    profileId: state.login.profile.auth0Id,
    profilePicture: state.login.profile.picture,    
    profileName: state.login.profile.censoredName,
    payoutInfoValid:  state.login.profile.stripeID ? true : false,  
    profileCurrency: state.login.profile.settings.currency
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    cancelGig:  (id, callback) => dispatch(actions.cancelGig(id,callback)),
    declineGig: (id, callback) => dispatch(actions.declineGig(id,callback)),
    updateGig:  (offer, callback)  => dispatch(actions.makeOffer(offer,callback)),
}}


const SmartGig = connect(mapStateToProps, mapDispatchToProps)(Gig)

export default localize(SmartGig, 'locale');
