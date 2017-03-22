import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import converter from '../utils/AdapterDTO'
import * as LoginActions from './LoginActions'
import CueupService from '../utils/CueupService'
import StripeService from '../utils/StripeService'
import { browserHistory } from 'react-router'
import cpr from 'danish-ssn'

const cueup = new CueupService()
const auth = new AuthService()
const stripe = new StripeService()

var ActionTypes = c.ActionTypes

  export function save(profile, callback){
    var self = this
      return function(dispatch){
          const token = auth.getToken()
          const data = converter.user.toDTO(profile)
          cueup.updateUser(token, data, (err, result)=>{
            if (err) {
              callback(err.message)
            }else{
               const profile = converter.user.fromDTO(result)
              dispatch (function() {return {
                  type: ActionTypes.FETCH_USER_SUCCEEDED,
                  profile:profile
                }}())
             dispatch (function() {return {
                type: ActionTypes.LOGIN_SUCCEEDED,
                profile: profile
              }}())
              callback(null)
            }
          })
      }
  }

  export function SaveProfilePicture(img, profile, callback){
    var self = this
      return function(dispatch){
          const token = auth.getToken()
          const data = converter.user.toDTO(profile)
          data.picture = img
          
          cueup.updateUser(token, data, (err, result)=>{
            if (err) {
              callback(err.message)
            }else{
              const profile = converter.user.fromDTO(result)
              dispatch (function() {return {
                  type: ActionTypes.FETCH_USER_SUCCEEDED,
                  profile:profile
                }}())
              dispatch (function() {return {
                type: ActionTypes.LOGIN_SUCCEEDED,
                profile: profile
              }}())
              callback(null)
            }
          })
      }
  }

  export function resendVerification(callback){
      return function(dispatch){
          const token = auth.getToken()
          cueup.resendVerification(token, (err, result)=>{
            if (err) {
              callback(err.message)
            }else{
              callback()
            }
          })
      }
  }

  const handleCueup=(dispatch,callback)=>{
    return (error, result)=>
      {
        if (error) {
          dispatch (function() {return {
              type: ActionTypes.FETCH_USER_FAILED,
              err: error.message
            }}())
            callback(error.message)
        }else{
          const profile = converter.user.fromDTO(result)
          dispatch (function() {return {
              type: ActionTypes.FETCH_USER_SUCCEEDED,
              profile:profile
            }}())
          callback(null)
        }
      }
  }

  export function getUser(permaLink=null,callback){
    return function(dispatch){
       dispatch (function() {return {
              type: ActionTypes.FETCH_USER_REQUESTED,
            }}())
      if(permaLink){
        cueup.getUser(permaLink, handleCueup(dispatch, callback));
      }else{
        const token = auth.getToken()
        cueup.getOwnUser(token, handleCueup(dispatch, callback));
      }
    }
  }


  export function deleteProfile(callback) {
    return function(dispatch){
    const token = auth.getToken()
    cueup.deleteUser(token, function(err, result){
      if (err) {
        (callback(err))
      }else{
        (callback(null))
      
      }
    })
  }
  }

  export function changePassword(email, callback) {
    return function(dispatch){
    cueup.requestPasswordChange(email, function(err, result){
      if (err) {
        (callback(err))
      }else{
        (callback(null))
      }
    })
  }
  }


  export function checkEmail(email, callback){
    return function (dispatch) {
      if (!email) {
        return callback("Please enter email.")
      }
      cueup.checkEmailExists(email, function(err,resp){
        if (err) {
          callback("Something went wrong.")
        }else{
          callback(null, resp)
        }
      })
    }
  }




export function toggleEditMode() {
      return  {
          type: ActionTypes.TOGGLE_EDIT_MODE
        }
}

export function updateProfileValue(name, value) {
      return  {
          type: ActionTypes.UPDATE_PROFILE_VALUE,
          name,
          value
        }
}

export function resetProfile(profile) {
  return function (dispatch) {
    dispatch( function() { return {
        type: ActionTypes.RESET_PROFILE,
        profile
      }}())
    dispatch( function() { return {
      type: ActionTypes.TOGGLE_EDIT_MODE
      }}())
      }
    }


export function updatePayoutInfo(data, callback) {
  var self=this


  return function(dispatch){
    
  stripe.createBankToken(data, (err, result)=>{
    if (err) {
      (callback(err))
    }else{
      const token = auth.getToken()

      data = {
        token: result.id,
        zip: data.bank_zip,
        address: data.bank_address,
        city: data.bank_city,
        ssn: data.ssn_number,
        birthday: cpr(data.ssn_number).date
      }
      cueup.updateUserBankInfo(token, data, function(err, result){
        if (err) {
          (callback(err))
        }else{
         // dispatch(self.getUser(callback))
        }
      })

    }
  });

}
}


export function updateSettings(settings, callback) {
  var self=this
  return function(dispatch){
  const data = converter.settings.toDTO(settings)

  const token = auth.getToken()
  cueup.updateSettings(token, data, function(err, result){
    if (err) {
      (callback(err))
    }else{
      const profile = converter.user.fromDTO(result)
      dispatch (function() {return {
          type: ActionTypes.FETCH_USER_SUCCEEDED,
          profile:profile
        }}())
      dispatch (function() {return {
              type: ActionTypes.LOGIN_SUCCEEDED,
              profile: profile
            }}())
      callback(null)
    }
  })
}
}


export function SaveBookMePreview(data, callback) {
  return function(dispatch){
  const token = auth.getToken()
  cueup.SaveBookMePreview(token, data, function(err, result){
    if (err) {
      callback(err, null)
    }else{
      callback(null, result)
    }
  })
}
}

  export function togglePublicProfile() {
          return {
          type: ActionTypes.TOGGLE_PUBLIC_PROFILE,
        }
  }
