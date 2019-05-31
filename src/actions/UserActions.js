import c from "../constants/constants";
import { authService as auth } from "../utils/AuthService";
import converter from "../utils/AdapterDTO";
import CueupService from "../utils/CueupService";
import ReactPixel from "react-facebook-pixel";

const cueup = new CueupService();

var ActionTypes = c.ActionTypes;

export function save(profile, callback) {
	return function(dispatch) {
		const token = auth.getAccessToken();
		const data = converter.user.toDTO(profile);
		cueup.updateUser(token, data, (err, result) => {
			if (err) {
				callback(err.message);
			} else {
				const profile = converter.user.fromDTO(result);
				dispatch(
					(function() {
						return {
							type: ActionTypes.FETCH_USER_SUCCEEDED,
							profile: profile
						};
					})()
				);
				dispatch(
					(function() {
						return {
							type: ActionTypes.LOGIN_SUCCEEDED,
							loggedInCueup: true,
							profile: profile
						};
					})()
				);
				callback(null);
			}
		});
	};
}

export function SaveProfilePicture(img, profile, callback) {
	return function(dispatch) {
		const token = auth.getAccessToken();

		cueup.updateUserPicture(token, img, (err, result) => {
			if (err) {
				callback(err.message);
			} else {
				const profile = converter.user.fromDTO(result);
				dispatch(
					(function() {
						return {
							type: ActionTypes.FETCH_USER_SUCCEEDED,
							profile: profile
						};
					})()
				);
				dispatch(
					(function() {
						return {
							type: ActionTypes.LOGIN_SUCCEEDED,
							loggedInCueup: true,
							profile: profile
						};
					})()
				);
				callback(null);
			}
		});
	};
}

export function resendVerification(callback) {
	return function(dispatch) {
		const token = auth.getAccessToken();
		cueup.resendVerification(token, (err, result) => {
			if (err) {
				callback(err.message);
			} else {
				callback();
			}
		});
	};
}

const handleCueup = (dispatch, callback) => {
	return (error, result) => {
		if (error) {
			callback(error.message);
			return dispatch({
				type: ActionTypes.FETCH_USER_FAILED,
				err: error.message
			});
		} else {
			const profile = converter.user.fromDTO(result);
			callback(null);
			return dispatch({
				type: ActionTypes.FETCH_USER_SUCCEEDED,
				profile: profile
			});
		}
	};
};

export function getUser(permaLink = null, callback) {
	return function(dispatch) {
		let promise = null;

		dispatch({ type: ActionTypes.FETCH_USER_REQUESTED });

		if (permaLink) {
			promise = cueup.getUser(permaLink, handleCueup(dispatch, callback));
		} else {
			const token = auth.getAccessToken();
			promise = cueup.getOwnUser(token, handleCueup(dispatch, callback));
		}

		dispatch({
			type: ActionTypes.PUSH_PROMISE,
			promise: promise
		});
	};
}

export function deleteProfile(callback) {
	return function(dispatch) {
		const token = auth.getAccessToken();
		cueup.deleteUser(token, function(err, result) {
			if (err) {
				callback(err);
			} else {
				callback(null);
			}
		});
	};
}

export function changePassword(email, callback) {
	return function(dispatch) {
		cueup.requestPasswordChange(email, function(err, result) {
			if (err) {
				callback(err);
			} else {
				callback(null);
			}
		});
	};
}

export function checkEmail(email, callback) {
	return function(dispatch) {
		if (!email) {
			return callback("Please enter email.");
		}
		cueup.checkEmailExists(email, function(err, resp) {
			if (err) {
				callback("Something went wrong.");
			} else {
				callback(null, resp);
			}
		});
	};
}

export function toggleEditMode() {
	return {
		type: ActionTypes.TOGGLE_EDIT_MODE
	};
}

export function updateProfileValue(name, value) {
	return {
		type: ActionTypes.UPDATE_PROFILE_VALUE,
		name,
		value
	};
}

export function resetProfile(profile) {
	return function(dispatch) {
		dispatch(
			(function() {
				return {
					type: ActionTypes.RESET_PROFILE,
					profile
				};
			})()
		);
		dispatch(
			(function() {
				return {
					type: ActionTypes.TOGGLE_EDIT_MODE
				};
			})()
		);
	};
}

export function updatePayoutInfo(data, callback) {
	return dispatch => {
		const token = auth.getAccessToken();
		data = {
			token: data.token.id,
			zip: data.bank_zip,
			address: data.bank_address,
			country: data.bank_country,
			city: data.bank_city,
			ssn: data.ssn_number,
			birthday: data.birthday
		};
		if (!data.birthday) {
			delete data.birthday;
		}
		cueup.updateUserBankInfo(token, data, function(err, result) {
			if (err) {
				callback(err);
			} else {
				const profile = converter.user.fromDTO(result);
				dispatch(
					(function() {
						return {
							type: ActionTypes.LOGIN_SUCCEEDED,
							profile: profile,
							loggedInCueup: true
						};
					})()
				);
				callback(null, result);
				ReactPixel.track("AddPaymentInfo");
			}
		});
	};
}

export function updateSettings(settings, callback) {
	return function(dispatch) {
		const data = converter.settings.toDTO(settings);
		const token = auth.getAccessToken();
		cueup.updateSettings(token, data, function(err, result) {
			if (err) {
				callback(err);
			} else {
				const profile = converter.user.fromDTO(result);
				dispatch(
					(function() {
						return {
							type: ActionTypes.FETCH_USER_SUCCEEDED,
							profile: profile
						};
					})()
				);
				dispatch(
					(function() {
						return {
							type: ActionTypes.LOGIN_SUCCEEDED,
							loggedInCueup: true,
							profile: profile
						};
					})()
				);
				callback(null);
			}
		});
	};
}

export function SaveBookMePreview(data, callback) {
	return function(dispatch) {
		const token = auth.getAccessToken();
		cueup.SaveBookMePreview(token, data, function(err, result) {
			if (err) {
				callback(err, null);
			} else {
				callback(null, result);
			}
		});
	};
}

export function togglePublicProfile() {
	return {
		type: ActionTypes.TOGGLE_PUBLIC_PROFILE
	};
}
