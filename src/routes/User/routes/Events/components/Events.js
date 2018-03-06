import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../../../../components/common/Button-v2'
import Formatter from '../../../../../utils/Formatter'
import NavLink from '../../../../../components/common/Navlink'
import LoadingPlaceholder from '../../../../../components/common/LoadingPlaceholder'
import {requestFeatures} from '../../../../../actions/Common'
import { connect } from 'react-redux'
import * as actions from '../../../../../actions/EventActions'
import { localize } from 'react-localize-redux';

class Events extends Component{
  static propTypes= {
    events: PropTypes.arrayOf(PropTypes.object),
    fetchEvents: PropTypes.func,
    payEvent: PropTypes.func,
    editEvent: PropTypes.func,
    cancelEvent: PropTypes.func,
    loading: PropTypes.bool
  }

  static contextTypes = {
    registerActions: PropTypes.func,
    color: PropTypes.string,
    loadingUser:    PropTypes.bool
  }

  componentWillMount(){
    if ( this.context.registerActions) {
        this.context.registerActions(this.getActionButtons)
    }

    this.props.fetchEvents()
  }


  getActionButtons = (props = this.props) => {
    const {translate} = this.props;

    return (
    <div className="context-actions" key="events_actions">

        <Button
          rounded={true}
          label=""
          name="request_features"
          onClick={requestFeatures}
        >
        {translate("Request features")}
        </Button>


    </div>

    )
  }



  render() {
    const {translate} = this.props;

    let renderEvent = (event, i) => {
      return(
        <div key={event.id}>
  <NavLink to={
    translate("routes./event/:id/:hash/info",{
      id: event.id,
      hash: event.hashKey
    })
   }>
  <div style={{borderColor:this.context.color}}>
        <div className="event-card" key={i}>

        <div>
        <div className="event-name">
          {event.name}
        </div>
        <div className="event-location">
          <svg version="1.1" id="Capa_1" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 466.583 466.582" style={{
                    enableBackground: "new 0 0 466.583 466.582"
          }}>
            <g>
              <path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z"/>
            </g>
          </svg>
          {" " + event.location.name}
        </div>
        </div>
        <div className="event-right">
          <div className="event-date">
            {Formatter.date.ToEU(event.startTime)}
          </div>
          <div className="event-status">
            
          {Formatter.cueupEvent.GetStatus(event.status, translate)}
          </div>
        </div>
        </div>
        </div>
        </NavLink>
        </div>
      )
    }

        function renderLoadingItem(){
          return [
            <LoadingPlaceholder/>,
              <LoadingPlaceholder/>,
                <LoadingPlaceholder/>,
                  <LoadingPlaceholder/>,
                    <LoadingPlaceholder/>]
        }

    return(
      <div className="events">
        { this.props.loading ?
          renderLoadingItem() :
          this.props.events.reverse().map(function(event, i){
            return renderEvent(event, i)
          })
        }
      </div>  )

  }
}



function mapStateToProps(state, ownProps) {
  return {
    events:  state.events.values,
    loading: state.events.isWaiting
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchEvents: () => { dispatch(actions.fetchEvents()) },
}}


const SmartEvents = connect(mapStateToProps, mapDispatchToProps)(Events)

export default localize(SmartEvents, 'locale');
