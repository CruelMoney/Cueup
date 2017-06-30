import React, { PropTypes } from 'react'
import checkmark from '../../../assets/checkmark.svg'
import SubmitButton from '../../../components/common/SubmitButton'
import dot from '../../../assets/dot.svg'
import ErrorMessage from '../../../components/common/ErrorMessage'
var KUTE = require("kute.js"); //grab the core
require("kute.js/kute-svg"); // Add SVG Plugin
require("kute.js/kute-css"); // Add CSS Plugin
require("kute.js/kute-attr"); // Add Attributes Plugin
require("kute.js/kute-text"); // Add Text Plugin

export default React.createClass({

   propTypes: {
      currentStep: PropTypes.number,
      onSubmit: PropTypes.func
    },

    contextTypes:{
      color: PropTypes.string,
      isFormValid: PropTypes.func
    },

    getInitialState(){
      return{
        msg: null
      }
    },

    componentDidMount(){
     
    },

    componentDidUpdate(prevProps, prevState){
      const step = this.props.currentStep
      const lastStep = prevProps.currentStep

      const options = { 
                        easing: 'easingCubicIn', 
                        duration: 400,
                        morphIndex: 135,
                        morphPrecision: 1
                        }

      if(step !== lastStep){
        if(lastStep>0){
          KUTE.fromTo('#step'+lastStep+'-circle', 
            {path: '#step'+lastStep+'-pin' },
            { path: 'M0,24.5a24.5,24.5 0 1,0 49,0a24.5,24.5 0 1,0 -49,0' },
              {...options, morphIndex: 37}
            ).start();
        }
        if(step>0){
          KUTE.fromTo('#step'+step+'-circle', 
            {path: '#step'+step+'-circle' },
            { path: '#step'+step+'-pin' },
             options
            ).start();
        }
      }

    },

 

  render() {
    
    // var className = finished ? "done progrezz" : "progrezz"
    var className = "progrezz"

    var dotBg = "url(" + dot + ")"
    return (
      <div className="event-submit-wrapper"> 
      <div className="progrezz-wrapper">
        <div
          style={{
            opacity: this.props.currentStep === 0 ? 0 : 1,
            backgroundImage: dotBg,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "50%"
          }}
          className={className}>
          
          <div 
          onClick={()=>this.props.setProgress(1)}
          className={this.props.currentStep >= 1 ? " step done" : " step" }>
            <p>
              {/*{this.props.currentStep > 1 ? <img className="checkmark" src={checkmark} alt="checkmark"/> : 1}*/}
              1
            </p>
             <svg 
             id="step1"
             width="49px" height="64px" viewBox="0 0 49 64" version="1.1" xmlns="http://www.w3.org/2000/svg" >          
                <path class="step-circle" id="step1-circle" d="M0,24.5a24.5,24.5 0 1,0 49,0a24.5,24.5 0 1,0 -49,0"></path>
                <path  id="step1-pin" className="step-pin" d="M24.5,64 C43,42 49,38.0309764 49,24.5 C49,10.9690236 38.0309764,0 24.5,0 C10.9690236,0 0,10.9690236 0,24.5 C0,38.0309764 7,42 24.5,64 Z" ></path>              
            </svg>
          </div>

          <div 
           onClick={()=>this.props.setProgress(2)}
          className={this.props.currentStep >= 2 ? "done step" : " step"}>
            <p >
              {/*{this.props.currentStep > 2 ? <img className="checkmark" src={checkmark} alt="checkmark"/> : 2}*/}
              2
            </p>
             <svg 
             id="step2"
             width="49px" height="64px" viewBox="0 0 49 64" version="1.1" xmlns="http://www.w3.org/2000/svg" >          
                <path  id="step2-circle" class="step-circle" d="M0,24.5a24.5,24.5 0 1,0 49,0a24.5,24.5 0 1,0 -49,0"></path>
                <path  id="step2-pin" className="step-pin" d="M24.5,64 C43,42 49,38.0309764 49,24.5 C49,10.9690236 38.0309764,0 24.5,0 C10.9690236,0 0,10.9690236 0,24.5 C0,38.0309764 7,42 24.5,64 Z" ></path>              
            </svg>
          </div>

          <div  
           onClick={()=>this.props.setProgress(3)}
          className={this.props.currentStep >= 3 ? "step done" : " step"}>
            <p >
              {/*{this.props.currentStep > 3 ? <img className="checkmark" src={checkmark} alt="checkmark"/> : 3}*/}
              3
            </p>
            <svg 
            id="step3"
            width="49px" height="64px" viewBox="0 0 49 64" version="1.1" xmlns="http://www.w3.org/2000/svg" >          
                <path  id="step3-circle" class="step-circle" d="M0,24.5a24.5,24.5 0 1,0 49,0a24.5,24.5 0 1,0 -49,0"></path>
                <path  id="step3-pin" className="step-pin" d="M24.5,64 C43,42 49,38.0309764 49,24.5 C49,10.9690236 38.0309764,0 24.5,0 C10.9690236,0 0,10.9690236 0,24.5 C0,38.0309764 7,42 24.5,64 Z" ></path>              
            </svg>
   
          </div>

        </div>
        
       </div>
        
        
       </div>
    )
  }
})
