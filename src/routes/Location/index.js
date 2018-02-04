import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/common/Footer'
import Button from '../../components/common/Button-v2'
import padlock from '../../assets/padlock.svg'
import note from '../../assets/note.svg'
import DJCard from '../../components/common/DJCard';
import Loadable from 'react-loadable';
import LoadingRequestForm from '../../components/common/RequestForm/LoadingRequestForm';
import Map from '../../components/common/Map';
import CitySvg from '../../components/graphics/City';
import { Redirect } from 'react-router';
import FloatingDJs from './components/FloatingCards';
import './index.css';

const AsyncRequestForm = Loadable({
  loader: () => import('../../components/common/RequestForm/RequestForm'),
  loading: LoadingRequestForm
});

const locations = {
  denmark: {/* Rectangle 8: */
    cities: {
      copenhagen : {
        coordinates: {
          lat: 55.6760968,
          lng: 12.5683372
        }
      }, 
      odense: {
        coordinates: {
          lat: 55.403756,
          lng: 10.40237
        }
      }, 
      aarhus: {
        coordinates: {
          lat: 56.162939,
          lng: 10.203921
        }
      }, 
    },
    coordinates: {
      lat: 56.35211531,
      lng: 11.01690928
    }
  }
}

class Location extends Component{
  secondColor = "#25F4D2"
  themeColor = "#31DAFF"
  requestForm = null

  getChildContext() {
    return {
      color: this.themeColor
    }
  }

  handleButtonClick = () => {
  window.scroll({
    top: this.requestForm.offsetTop-20,
    left: 0,
    behavior: 'smooth'
  });
  }

  render() {
    const { match } = this.props;
    const { city, country } = match.params;
    const locationName = !city ? country : city;
    const location = !!city 
    ? (!!locations[country] ? locations[country].cities[city] : null)
    : locations[country];

    // Redirect
    if(!location){
      return <Redirect to="/not-found"/>
    }

    let title = city || country;
    title = title[0].toUpperCase() + title.substring(1)
    const radius = !!city ? 25000 : 100000;
    const zoomlevel = !!city ? 11 : 8;
    const { coordinates } = location;

    return (
      <div className="locations-page">
        <div className="span-wrapper">
        
        <header>
          <Map
            noCircle={!city}
            hideRoads={true}
            radius={radius}
            defaultCenter={{
              lat: coordinates.lat + 0.05,
              lng: coordinates.lng - (!!city ? 0.5 : 2)
            }}
            height={600}
            value={coordinates}
            editable={false}
            themeColor={this.themeColor}
            radiusName="playingRadius"
            locationName="playingLocation"
            />
        
          <article>
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                <div className="card">
                    <h1 key="title">
                    Book DJ in
                    <span>{title}</span>
                    </h1>
                    <p key="paragraph">
                      Cueup is the easiest way for you to get a great DJ for your event. Just fill out the form below, and soon you will receive non-binding offers from qualified DJs.
                    </p>

                    <div style={{float:"left", marginTop:"20px"}}>
                      <Button
                        active
                        
                        onClick={this.handleButtonClick}>
                        <div style={{width:"150px", color:this.themeColor}}>GET OFFERS</div>
                      </Button>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </article>

        </header>


          <div className="container">
            <div ref={(f) => this.requestForm = f}></div>
            <AsyncRequestForm 
            initialCity={title}
            />
          </div>

          <CitySvg 
            id="city-illustration"
          />
          </div>
          
          <FloatingDJs 
            location={locationName}
          />

          
          <div className="info-boxes grey">
            <div className="container">
              <div className="row">
                      <div  className="col-sm-5 col-sm-push-1">
                        <div className="card">
                          <img src={padlock} alt="icon"/>
                      <h2 style={{color:this.themeColor}}>Secured booking system</h2>
                      <p>
At Cueup the process of booking ensures that both the organizer and the DJ are protected from fraud. In case of a cancelation from either side, the money is instantly refunded. Otherwise the money is disbursed when the DJ has played at the event. In case of a cancelation by the DJ, we will try to find a new DJ as quickly as possible.</p>
                  </div>
                </div>
                <div  className="col-sm-5 col-sm-push-1">
                  <div className="card">
                    <img src={note} alt="icon"/>
                    <h2 style={{color:this.themeColor}}>The most qualified DJs</h2>
                    <p>
At Cueup we focus on finding the most qualified DJs for your event - so you don’t have to. Don’t waste time searching for DJs when you can have offers from great DJs send directly to you.  Each offer shows the DJ, their reviews and rating so you can confidently choose a DJ you can trust.                     </p>
                  </div>
                </div>
                </div>
              </div>
              </div>

              <Footer
                bgColor="#FFFFFF"
                color={this.secondColor}
                firstTo="/signup"
                secondTo="/howitworks"
                firstLabel="Become DJ"
                secondLabel="How it works"
                title={`Are you a DJ in ${title}?`}
                subTitle={`Apply to become DJ or see how it works.`}
                />

            </div>

    )
  }
}

Location.childContextTypes = {
  color: PropTypes.string,
}


export default Location
