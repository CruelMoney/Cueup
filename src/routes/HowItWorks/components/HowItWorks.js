import React from 'react';
import Footer from '../../../components/common/Footer'
import Particles from 'react-particles-js';
import PConfig from '../../../assets/particlesjs-config.json';
import PConfig1 from '../../../assets/particlesjs-config-1.json';
import PConfig2 from '../../../assets/particlesjs-config-2.json';
import PConfig3 from '../../../assets/particlesjs-config-3.json';
import PConfig4 from '../../../assets/particlesjs-config-4.json';
import PConfig5 from '../../../assets/particlesjs-config-5.json';



export default React.createClass({
  themeColor:"#31DAFF",

  componentDidMount(){

  },

  render() {
    return (
      <div>
        <header className="">
          <div id="stripes">
            <span key="a"/>
            <span key="b"/>
            <span key="c"/>
            <span key="d"/>
          </div>
          <div className="container">
             <div className="col-md-7 col-md-pull-7">
                <h1 key="title">How it works</h1>
                <p key="paragraph">Stripe is the best software platform for running an internet
                  business. We handle billions of dollars every ythinking businesses around the world. thinking businesses around the world.thinking businesses around the world.ear for forward-
                  thinking businesses around the world.
                </p>
            </div>
              <div className="col-md-5 col-md-push-7 particles">
                <Particles params={PConfig} width="100%" height="300px"/>
              </div>

           

          </div>
        </header>
        <div style={{position:"relative"}} >
          <div className="particles-bg" />
          <div className="container">
            <div id="particles">
              <Particles params={PConfig1} width="270px" height="270px"/>
              <Particles params={PConfig2} width="310px" height="310px"/>
              <Particles params={PConfig3} width="350px" height="350px"/>
              <Particles params={PConfig4} width="390px" height="390px"/>
              <Particles params={PConfig5} width="430px" height="430px"/>
            </div>
            <div className="how-it-works" >
              <section>
                <div>
                  <div>
                    <div key="a" className="how-to-title">
                      <div className="circle">1</div>
                      <h2>Organizer creates event</h2>
                    </div>
                    <p key="b">Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s </p>
                  </div>
                </div>
              </section>
              <section>
                    <div key="a" className="how-to-title">
                      <div className="circle">2</div>
                      <h2>Qualified DJs return offer</h2>
                    </div>
                    <p key="b">Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s </p>
              </section>
              <section>
                    <div key="a" className="how-to-title">
                      <div className="circle">3</div>
                      <h2>Organizer confirms an offer</h2>
                    </div>
                    <p key="b">Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s </p>
              </section>
              <section>
                    <div key="a" className="how-to-title">
                      <div className="circle">4</div>
                      <h2>DJ plays at event</h2>
                    </div>
                    <p key="b">Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s </p>
              </section>
              <section>

                    <div key="a" className="how-to-title">
                      <div className="circle">5</div>
                      <h2>Payout is released</h2>
                    </div>
                    <p key="b">Stripe builds the most powerful and flexible tools for internet commerce. Whether you’re creating a subscription service, an on-demand marketplace, an e-commerce store, or a crowdfunding platform, Stripe’s meticulously-designed APIs and unmatched functionality help you create the best possible product for your users. Hundreds of thousands of the world’s </p>

              </section>
          </div>
        </div>
      </div>
      <Footer
        color={this.themeColor}
        firstTo="/"
        secondTo="/signup"
        firstLabel="Arrange event"
        secondLabel="Become DJ"
        title="Ready to get started?"
        subTitle="Arrange an event, or become a DJ."
        />
      </div>

    )
  }
})
