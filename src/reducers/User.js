import c from '../constants/constants';
import assign from 'lodash.assign';
import profile from './Profile';
import { combineReducers } from 'redux'



var ActionTypes = c.ActionTypes;

const initialState = { //define initial state - an empty form
  signedIn: false,
  isWaiting: false,
  editMode: false
};

const status = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.LOGIN_REQUESTED:
      return assign({}, state, {
              isWaiting: true
            });
       break
  case ActionTypes.LOGIN_SUCCEEDED:
      return assign({}, state, {
        signedIn: true,
        isWaiting: false
      });
       break
 case ActionTypes.LOGIN_FAILED:
     return assign({}, state, {
       signedIn: false,
       err: action.err,
       isWaiting: false
     });
      break
  case ActionTypes.LOGOUT_SUCCEEDED:
      return initialState
      break
  case ActionTypes.UPDATEPROFILE_REQUESTED:
      return assign({}, state, {
                isWaiting: true
             });
       break

 case ActionTypes.UPDATEPROFILE_SUCCEEDED:
     return  assign({}, state, {
               signedIn: true,
               isWaiting: false
            });


      break
 case ActionTypes.UPDATEPROFILE_FAILED:
     return assign({}, state, {
               err: action.err,
               isWaiting: false
            });
      break

  case ActionTypes.TOGGLE_EDIT_MODE:
      return  assign({}, state, {
                editMode: !state.editMode,
             });
      break

  default:
    return state;
  }
}

const editableProfile = (state = {}, action, profile) => {

    switch (action.type) {
    case ActionTypes.UPDATE_PROFILE_VALUE:
        return  assign({}, state, {
            [action.name]: action.value
        })
        break
    case ActionTypes.UPDATE_PROFILE_VALUE:
        return  assign({}, state, {
            [action.name]: action.value
        })
        break

    case ActionTypes.LOGOUT_SUCCEEDED:
        return {}
        break

    case ActionTypes.TOGGLE_EDIT_MODE:
        return  assign({}, profile);
        break

   default:
       return state;

   }
  }


function composition(state = {}, action) {
  let statusResult =            status(state.status, action)
  let profileResult =           profile(state.profile, action)
  let editableProfileResult =   editableProfile(state.editableProfile, action, profileResult)

  return { status:            statusResult,
           profile:           profileResult,
           editableProfile:   editableProfileResult
          };
}

export default composition
