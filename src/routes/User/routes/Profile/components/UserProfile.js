import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from '../../../../../components/common/Button-v2'
import Genres from '../../../../../components/common/ToggleButtonHandler'
import connectToForm from '../../../../../components/higher-order/connectToForm'
import {default as SimpleMap} from "../../../../../components/common/Map"
import LoadingPlaceholder from '../../../../../components/common/LoadingPlaceholder'
import TextWrapper from '../../../../../components/common/TextElement'
import c from '../../../../../constants/constants'

const Map = connectToForm(SimpleMap)

export default class UserProfile extends Component{
    static propTypes = {
        profile: PropTypes.object,
        save: PropTypes.func,
        deleteProfile: PropTypes.func,
    }

    static contextTypes = {
      loadingUser:         PropTypes.bool,
      reset:           PropTypes.func,
      registerActions: PropTypes.func,
      toggleEditMode:  PropTypes.func,
      editing:         PropTypes.bool,
      valid:           PropTypes.bool,
      disableEditMode: PropTypes.func
    }

    componentWillMount(){
      if ( this.context.registerActions) {
          this.context.registerActions(this.getActionButtons)
      }
    }

    getActionButtons = (props = this.props) => {

        return (
            <div className="context-actions" key="profile_actions">
                {this.props.publicProfileMode ? 
                  <Button
                    onClick={this.props.togglePublicProfile}
                    name="toggle_public"
                    >
                    Back to profile
                  </Button>
                :null}
            </div>

        )
    }

    render() {
        const isDJ = this.props.profile.isDJ
       
        return (
          <div>
        
            { this.context.loadingUser ?
              <div>
                <LoadingPlaceholder/>
                <LoadingPlaceholder/>
                <LoadingPlaceholder/>
                <LoadingPlaceholder/>
              </div>
              :
              <div>
                <div className="profile">
                  
                  {isDJ
                    ? <TextWrapper label="Bio" text="">
                       <p>
                       {this.props.profile.bio} 
                        </p>
                       

                    </TextWrapper>
                  : null}
                  {isDJ
                    ? <TextWrapper label="Genres" text="">
                      <Genres
                        name="genres"
                        validate={['required']}
                        potentialValues={c.GENRES}
                        columns={4}
                        value={this.props.profile.genres}
                        disabled={!this.context.editing}/>
                    </TextWrapper>
                    : null
                  }

                  {isDJ
                    ? <TextWrapper label="Location" text="The DJ normally plays in this area.">
                      <Map
                        radius={this.props.profile.playingRadius}
                        value={this.props.profile.playingLocation}
                        editable={this.context.editing}
                        themeColor={this.context.color}
                        radiusName="playingRadius"
                        locationName="playingLocation"/>
                    </TextWrapper>
                  : null}
                  
                  {/* {isDJ
                    ? <TextWrapper label="Experience" text="How much experience do you have?">
                    <ExperienceSlider queupGigs={this.props.profile.gigsCount} otherGigs={this.props.profile.experienceCount} disabled={!this.context.editing} name="experienceCount"/>
                    </TextWrapper>
                  : null} */}




                  {isDJ
                    ? <TextWrapper 
                    label="Cancelation policy" 
                    text={
                     "Full refund if event is cancelled " + this.props.profile.settings.cancelationDays
                     + " or more days before it starts. Otherwise " +
                     this.props.profile.settings.refundPercentage +"% is refunded."
                    }/>
                  : null}
            

                </div>
              </div>}
          </div>
        )

    }
}