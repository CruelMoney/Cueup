var keyMirror = require('keymirror')


module.exports = {
  ActionTypes: keyMirror({
    // Session
    SIGNUP_REQUESTED: null,
    SIGNUP_SUCCEEDED: null,
    SIGNUP_FAILED: null,

    LOGIN_REQUESTED: null,
    LOGIN_SUCCEEDED: null,
    LOGIN_FAILED: null,

    LOGOUT_SUCCEEDED: null,

    UPDATEPROFILE_REQUESTED: null,
    UPDATEPROFILE_SUCCEEDED: null,
    UPDATEPROFILE_FAILED: null,

    UPDATE_PROFILE_VALUE: null,
    UPDATE_PROFILE_META_VALUE: null,
    RESET_PROFILE: null,

    DELETE_PROFILE_REQUESTED: null,
    DELETE_PROFILE_FAILED: null,
    DELETE_PROFILE_SUCCEEDED: null,

    TOGGLE_EDIT_MODE: null,


    // Routes
    REDIRECT: null,

    FORM_UPDATE_VALUE: null,
    FORM_UPDATE_FILTERS:null,
    FORM_RESET:null,
    SET_SIGNUP:null,
    FORM_SUBMIT_REQUESTED:null,
    FORM_SUBMIT_FAILED:null,
    FORM_SUBMIT_SUCCEEDED:null,

    FETCH_EVENTS_REQUESTED:null,
    FETCH_EVENTS_SUCCEEDED:null,
    FETCH_EVENTS_FAILED:null,

    FETCH_GIGS_REQUESTED:null,
    FETCH_GIGS_SUCCEEDED:null,
    FETCH_GIGS_FAILED:null,

    FETCH_REVIEWS_REQUESTED:null,
    FETCH_REVIEWS_SUCCEEDED:null,
    FETCH_REVIEWS_FAILED:null,

    CREATE_EVENT_REQUESTED:null,
    CREATE_EVENT_FAILED:null,
    CREATE_EVENT_SUCCEEDED:null,

    CHECK_EMAIL_REQUESTED: null,
    CHECK_EMAIL_FAILED: null,
    CHECK_EMAIL_SUCCEEDED:null,

    UPDATE_GEOLOCATION:null,

    REMOVE_MENU_ITEM:null,
    REGISTER_MENU_ITEM:null

  }),
   GENRES: [
    {name: "80's"},
    {name: "90's"},
    {name: "00's"},

    {name: "R&B"},
    {name: "Hip Hop"},
    {name: 'Reggae'},

    {name: 'Disco'},
    {name: "Rock"},

    {name: "Trap"},
    {name: 'Dubstep'},

    {name: "Techno"},
    {name: 'House'},
    {name: "UKG"},
    {name: "Lounge"},


    {name: 'Top 40'},
    {name: "Remixes"},
    {name: 'Latin'},
    {name: 'Local'},
  ],
  WEEKDAYS: [
   {name: 'Monday'},
   {name: 'Tuesday'},
   {name: 'Wednesday'},
   {name: 'Thursday'},
   {name: 'Friday'},
   {name: 'Saturday'},
   {name: 'Sunday'},
 ],
 NOTIFICATIONS: [
  {name: 'Gig request'},
  {name: 'Gig reminder'},
  {name: 'Gig paid'},
  {name: 'Queup news'},
  {name: 'New review'},
],
CUSTOMER_NOTIFICATIONS: [
 {name: 'DJ offer'},
 {name: 'Queup news'},
]


}

//
// const darkMapStyle = [
// {
//   "stylers": [
//   { "visibility": "simplified" },
//
//   ]
// },{
//   "featureType": "administrative",
//   "elementType": "labels",
//   "stylers": [
//   { "visibility": "off" }
//   ]
// },{
//   "featureType": "landscape",
//   "stylers": [
//   { "visibility": "simplified" },
//   { "lightness": 90 },
//   { "gamma": 0.31 }
//   ]
// },{
//   "featureType": "poi",
//   "stylers": [
//   { "visibility": "off" }
//   ]
// },{
//   "featureType": "road",
//   "stylers": [
//   { "visibility": "on" }
//   ]
// },{
//   "featureType": "transit",
//   "stylers": [
//   { "visibility": "off" }
//   ]
// },{
//   "featureType": "water",
//   "stylers": [
//   { "visibility": "on" },
//   { "color": "#000000" }
//   ]
// },{
//   "featureType": "road",
//   "elementType": "labels",
//   "stylers": [
//   { "visibility": "off" }
//   ]
// },{
//   "featureType": "road.highway",
//   "stylers": [
//   { "color": "#808080" }
//   ]
// },{
//   "featureType": "landscape",
//   "elementType": "labels",
//   "stylers": [
//   { "visibility": "off" }
//   ]
// },{
//   "featureType": "administrative.country",
//   "stylers": [
//   { "visibility": "on" }
//   ]
// },{
//   "featureType": "administrative.locality",
//   "elementType": "labels.text.fill",
//   "stylers": [
//   { "visibility": "on" },
//   { "color": "#090f0e" }
//   ]
// },{
// }
// ]
