import React, { PropTypes } from 'react'
import ToggleOptions from '../../../../../components/common/ToggleOptions'
import ToggleHandler from '../../../../../components/common/ToggleButtonHandler'
import Button from '../../../../../components/common/Button-v2'
import PayoutForm from '../../../../../components/common/PayoutForm'
import Popup from '../../../../../components/common/Popup'
import SubmitButton from '../../../../../components/common/SubmitButton'
import TextWrapper from '../../../../../components/common/TextElement'
import assign from 'lodash.assign'
import LoadingPlaceholder from '../../../../../components/common/LoadingPlaceholder'
import wNumb from 'wnumb'
import Slider from '../../../../../components/common/Slider'
import ErrorMessage from '../../../../../components/common/ErrorMessage'

const preferences = React.createClass({
  propTypes: {
    user: PropTypes.object,
    provider: PropTypes.string,
    changePassword: PropTypes.func,
    connectFacebook: PropTypes.func,
    connectSoundCloud: PropTypes.func,
    connectDB: PropTypes.func,
    deleteProfile: PropTypes.func,
    updateSettings: PropTypes.func
  },
  contextTypes:{
    loading:         PropTypes.bool,
    reset:           PropTypes.func,
    registerActions: PropTypes.func,
    toggleEditMode:  PropTypes.func,
    editing:         PropTypes.bool,
    valid:           PropTypes.bool
  },

  componentWillMount(){
    this.context.registerActions(this.getActionButtons)
  },

  getInitialState(){
    return {
      showPopup: false
    }
  },

  updateSettings(form, callback){
    var eSettings = this.props.user.settings.emailSettings

    //setting all settings to false initially
    for (var s in eSettings){
      if (eSettings.hasOwnProperty(s)) {
         eSettings[s] = false
      }
    }

    //setting the selected to true
    form.values.emailSettings.forEach(function(s){
                              eSettings[s] = true
                            })

    var settings = assign({}, form.values, {
            emailSettings: eSettings,
            refundPercentage: this.state.refundPercentage
          })

    this.props.updateSettings(settings,callback)
  },

  hidePopup(){
    this.setState({
      showPopup: false
    })
  },

  getUserEmailNotifications(){
    var vals = Object.entries(this.props.user.settings.emailSettings)
      .filter(s=>s[1] === true)
      .map(s=>s[0])

    return vals

  },

  getPotentialEmailNotifications(){
   const  vals = Object.keys(this.props.user.settings.emailSettings)
                  .map(function(s){return{name:s}})


    return vals
  },

  getActionButtons(props = this.props) {
      const editing = this.context.editing

      return (
          <div className="context-actions" key="profile_actions">
            {editing
              ?
                <SubmitButton
                  active={this.context.valid}
                  onClick={this.updateSettings}
                  name="save_edit_profile"
                > Save
                </SubmitButton>
              : <Button
                onClick={this.context.toggleEditMode}
                name="edit_profile"
                >Edit settings
              </Button>
            }

            <SubmitButton
              dangerous
              warning="Are you sure you want to delete? All future gigs, events and payments will be lost."
              onClick={(form, callback) => this.props.deleteProfile(callback)}
              name="Delete_profile"
            > Delete profile
            </SubmitButton>
            <ErrorMessage/>

          </div>

      )
  },

  render() {
    const isDJ = this.props.user.isDJ
    return <div>
      { this.context.loading ?
        <div>
          <LoadingPlaceholder/>
          <LoadingPlaceholder/>
          <LoadingPlaceholder/>
          <LoadingPlaceholder/>
        </div>
        :
        <div>
          <Popup showing={this.state.showPopup}
            onClickOutside={this.hidePopup}>
            <PayoutForm/>

          </Popup>

            <div >
              {isDJ ?
                <TextWrapper
                  label="Payout"
                  text="To get paid, you need to set up a payout method.
                  Cueup releases payouts about 24 hours after a job is finished.">
                  {this.props.user.last4 ?
                    <div className="user-card-info">
                      <div className="user-card-fact">
                        <p>Last 4 digits of current account number</p>
                        {"..." + this.props.user.last4}
                      </div>
                    </div>

                  : null}
                  <div style={{display:"inline-block"}}>
                    <Button
                      rounded={true}
                      onClick={()=>this.setState({showPopup:true})}
                      name="show-payout-popup"
                    >{!this.props.user.last4 ?
                      "Setup payout info"
                    : "Update payout info"}</Button>
                  </div>

                </TextWrapper>
              : null }

              {isDJ ?
                <div>
                  <TextWrapper
                    label="Email notifications"
                    text="What kind of notifications do you wish to receive?">
                    <ToggleHandler
                      disabled={!this.context.editing}
                      name="emailSettings"
                      potentialValues={this.getPotentialEmailNotifications()}
                      value={this.getUserEmailNotifications()}
                      columns={3}
                    />
                  </TextWrapper>
                </div>
              : null}

              {isDJ ?
                <div>
                  <TextWrapper
                    label="Cancelation policy"
                    text="How many days notice do you allow for cancelations?
                    If the organizer wants to cancel the event within less days, the percentage specified below will be refunded.
                    The organizer will have to agree to this policy when confirming your offer.">

                    <ToggleOptions
                      disabled={!this.context.editing}
                      name="cancelationDays"
                      glued={true}
                      value={this.props.user.settings.cancelationDays}
                    >

                      <Button
                        name={1}
                      >1 day</Button>
                      <Button
                        name={2}
                      >2 days</Button>
                      <Button
                        name={7}
                      >A week</Button>

                      <Button
                        name={14}
                      >Two weeks</Button>

                      <Button
                        name={30}
                      >A month</Button>

                    </ToggleOptions>
                  </TextWrapper>
                  <TextWrapper
                    label="Refund percentage"
                    text="How many percentage of the offer should be returned if the organizer cancels within less days than the minimum notice?">
                    <Slider
                      disabled={!this.context.editing}
                      name="refundPercentage"
                      range={{min:0, max:100}}
                      step={1}
                      connect="lower"
                      value={[this.props.user.settings.refundPercentage]}
                      onChange={(values) => this.setState({
                              refundPercentage: values[0]
                      })}
                      format={ wNumb({
                              decimals: 0,
                              thousand: ".",
                      })}
                    />
                    <p style={{marginTop:"15px"}}>
                      <span>{this.state.refundPercentage}% </span>will be refunded.</p>
                  </TextWrapper>
                  <TextWrapper
                    label="Standby"
                    text="Are you unavailable to play at the moment? You will not receive requests if you're unavailable.">

                    <ToggleOptions
                      name="standby"
                      glued={true}
                      disabled={!this.context.editing}
                      value={this.props.user.settings.standby ? true : false}

                    >
                      <Button
                        name={true}
                      >Unavailable</Button>
                      <Button
                        name={false}
                      >Available</Button>
                    </ToggleOptions>
                  </TextWrapper>
                </div>
              : null}


              { this.props.provider === "auth0" ?

                <TextWrapper
                  label="Password"
                  text="Request an email to change your password.">
                  <div style={{display:"inline-block"}}>
                    <SubmitButton
                      onClick={(email, callback) => this.props.changePassword(this.props.user.email, callback)}
                      name="request_change_password"
                    >Request email</SubmitButton>
                  </div>
                </TextWrapper>
              : null }

              { !this.props.user.email_verified  ?

                <TextWrapper
                  label="Email verification"
                  text="Request an email to verify your email.">
                  <div style={{display:"inline-block"}}>
                    <SubmitButton
                      onClick={(id, callback) => this.props.resendVerification(this.props.user.auth0Id, callback)}
                      name="request_verification_email"
                    >Request email</SubmitButton>
                  </div>
                </TextWrapper>
              : null }


              {/* <TextWrapper
                label="Connect social platforms"
                text="If you want to log in using a social platform or connect existing accounts.">
                <div className="row">
                <div className="col-xs-3">
                <Button
                rounded= {true}
                label="Facebook"
                active={true}
                onClick= {this.props.connectFacebook}
                name="connect_facebook"
                />
                </div>
                <div className="col-xs-3">
                <Button
                rounded= {true}
                label="SoundCloud"
                active={true}
                onClick= {this.props.connectSoundCloud}
                name="connect_soundcloud"
                />
                </div>
                <div className="col-xs-3">
                <Button
                rounded= {true}
                label="E-mail & Password"
                active={true}
                onClick= {this.props.connectDB}
                name="connect_db"
                />
                </div>
                </div>
              </TextWrapper> */}


          </div>
        </div>
      }
    </div>
  }
})


import { connect } from 'react-redux'
import * as actions from '../../../../../actions/UserActions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    user:  state.user.profile,
    provider: state.user.profile.provider,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    connectFacebook: () => {console.log("not implemented")},
    connectSoundCloud: () =>{console.log("not implemented")},
    connectDB:  () => {console.log("not implemented")},
    updateSettings: (settings, callback) => dispatch(actions.updateSettings(settings,callback)),
    deleteProfile: (callback) => {dispatch(actions.deleteProfile(callback))},
    changePassword: (email, callback) => dispatch(actions.changePassword(email, callback)),
    resendVerification: (form, callback) => dispatch(actions.resendVerification(callback))
}}


  function mergeProps(stateProps, dispatchProps, ownProps) {
    return {...stateProps, ...dispatchProps}
  }


const SmartPreferences = connect(mapStateToProps, mapDispatchToProps, mergeProps, { pure: false })(preferences)

export default props => (
    <SmartPreferences {...props}/>
)
