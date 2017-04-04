import React,  { PropTypes } from 'react'
import UserHeader from '../blocks/UserHeader'
import Footer from '../../../../components/common/Footer'
import Form from '../../../../components/common/Form-v2'

import '../../../../css/transitions.css'

var user = React.createClass({
  themeColor: "#25F4D2",
  textColor: "rgb(18, 119, 103)",
  secondColor: "#31DAFF",

  propTypes: {
    profile: PropTypes.object,
    isOwnProfile:PropTypes.bool
  },

  childContextTypes: {
      profile: PropTypes.object,
      hideUserCard: PropTypes.func,
      showUserCard: PropTypes.func,
      registerActions: PropTypes.func,
      toggleEditMode: PropTypes.func,
      editing: PropTypes.bool,
      valid: PropTypes.bool,
      color: PropTypes.string,
      loadingUser: PropTypes.bool,
      textColor: PropTypes.string,
      disableEditMode: PropTypes.func,
      isOwnProfile:PropTypes.bool,
      updateAction: PropTypes.func
  },

  componentWillMount(){
    if(!this.props.profile.user_metadata){
      const permaLink = this.props.isOwnProfile ? null : this.props.params.permalink
      this.props.fetchUser(permaLink, (res,err)=>{})
    }
    this.updateNotification(this.props)
  },

  updateNotification(props){
        if(props.profile.app_metadata && props.isOwnProfile){
          if (!props.profile.app_metadata.emailVerified) {
            this.setState({notification:"You won't receive any gigs before you have confirmed your email-address."})
            return
          }
          if (props.profile.picture && props.profile.picture.indexOf("default-profile-pic") !== -1) {
            this.setState({notification:"You should update your profile picture."})
            return
          }
          if (props.profile.app_metadata.notification) {
            this.setState({notification: props.profile.app_metadata.notification})
            return
          }
          this.setState({notification:"You don't have any new notifications."})
        }else{
            if(props.profile.settings && props.profile.settings.standby ){
              this.setState({notification:"This DJ is currently on standby and can not be booked."})}
            else{
              this.setState({notification:""}
              )}
        }
  },

  componentWillReceiveProps(nextProps){
    if(nextProps.profile.firstName){
         document.title = nextProps.profile.firstName + " | Cueup"
    }
    
    this.updateNotification(nextProps)

    if(nextProps.params.permalink !== this.props.params.permalink){

       const permaLink = nextProps.isOwnProfile ? null : nextProps.params.permalink
       nextProps.fetchUser(permaLink, (res,err)=>{})
    }

  },

  setActions(){
     this.setState({actions: this.getActions()})
  },

  getChildContext() {
   return {
     hideUserCard: this.hideUserCard,
     showUserCard: this.showUserCard,
     registerActions: (getActionsFunc)=>{
       this.getActions = getActionsFunc
       this.setState({
         editing: false
       }, this.setActions())

     },
     toggleEditMode:  ()=>{
       this.setState(
         {
         editing: !this.state.editing,
     },this.setActions)},

     disableEditMode:  ()=>{
       this.setState(
         {
         editing: false,
     },this.setActions)},
     updateAction: this.setActions,
     color:        this.themeColor,
     editing:     this.state.editing,
     valid:        this.state.valid,
     loadingUser: this.props.loading,
     textColor: this.textColor,
     profile: this.props.profile,
      isOwnProfile:this.props.isOwnProfile,
    }
  },

  getInitialState() {
    return {
      showUserCard: true,
      actions: [],
      editing: false,
      valid: false
    }
  },

  hideUserCard(){
    this.setState({
      showUserCard: false
    })
  },
  showUserCard(){
    this.setState({
      showUserCard: true
    })
  },

  render() {
    return (
      <div >
        <Form
          noError
          resetStatusOnSucces
          name="user-form"
          formValidCallback={
            ()=>{this.setState({valid:true}, this.setActions)
            }
          }
          formInvalidCallback={()=>{
            this.setState({valid:false},this.setActions)
          }}
        >
          <UserHeader
            isOwnProfile={this.props.isOwnProfile}
            geoLocation={
                (this.props.geoCity ? (this.props.geoCity + ", ") : "") +
                (this.props.geoCountry ? this.props.geoCountry : "") }
            profile={this.props.profile}
            hideInfo={!this.state.showUserCard}
            actions={this.state.actions}
            notification={this.state.notification}
            loading={this.props.loading}
            
          />

          <div  className="user-container container">
            <div className="row">
              <div className={"col-sm-4"}></div>
              <div className={"col-sm-8"}>
                <div className="mobileActions">
                {this.props.isOwnProfile ? this.state.actions : null}
                </div>
               {this.props.children}
              </div>
            </div>
          </div>
        </Form>

          <Footer
            noSkew
            color={this.secondColor}
            firstTo="/"
            secondTo="/howitworks"
            firstLabel="Arrange event"
            secondLabel="How it works"
            title="Organizing yourself?"
            subTitle="Arrange event, or see how it works."
          />
      </div>
    )

  }
})


import { connect } from 'react-redux'
import * as actions from '../../../../actions/UserActions'


function mapStateToProps(state, ownProps) {
  const isOwnProfile = 
    state.login.status.publicProfileMode ? false :
    (state.login.profile.user_metadata) 
    ? state.login.profile.user_metadata.permaLink.toLowerCase() === ownProps.params.permalink.toLowerCase()
    : false

  return {
    profile:  isOwnProfile ? state.login.profile : state.user.profile,
    loading: isOwnProfile ? state.login.status.isWaiting : state.user.status.isWaiting,
    geoCity: state.session.city,
    geoCountry: state.session.country,

    isOwnProfile:isOwnProfile
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
      fetchUser: (permaLink, callback) =>  {dispatch(actions.getUser(permaLink, callback))},
}}


const SmartUser = connect(mapStateToProps,mapDispatchToProps)(user)

export default props => (
    <SmartUser {...props}/>
)
