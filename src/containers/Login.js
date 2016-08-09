import React from 'react'
import { connect } from 'react-redux'
import Login from '../components/blocks/Login'
import * as actions from '../actions/LoginActions'


function mapStateToProps(state, ownProps){
  return{
    isLoading: state.login.isWaiting
  }
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    login: (email, password) => dispatch(actions.login({type:"EMAIL", email, password})),
    loginFacebook: ()        => dispatch(actions.login({type:"FACEBOOK"})),
    loginSoundcloud: ()      => dispatch(actions.login({type:"SOUNDCLOUD"})),
  }
}

const SmartLogin = connect(mapStateToProps, mapDispatchToProps)(Login)


export default props => (
    <SmartLogin {...props}/>
)
