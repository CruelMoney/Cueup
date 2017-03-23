import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux';
import Modal from 'react-modal'




	function indexOf(arr, prop) {
	  if (arr.indexOf) return arr.indexOf(prop)
	  for (var i = 0, len = arr.length; i < len; i++)
	    if (arr[i] === prop) return i
	  return -1
	}

	const addClass = function(className, el) {
	  if (!el) return
	  if (el.className === "") return el.className = className
	  var classes = el.className.split(' ')
	  if (indexOf(classes, className) > -1) return classes
	  classes.push(className)
	  el.className = classes.join(' ')
	  return classes
	}

	const removeClass = function(className, el) {
	  if (!el) return
	  if (el.className === "") return
	  var classes = el.className.split(' ')
	  var idx = indexOf(classes, className)
	  if (idx > -1) classes.splice(idx, 1)
	  el.className = classes.join(' ')
	  return classes
	}



const Popup = React.createClass({
    displayName: 'Popup',

    propTypes: {
      showing: PropTypes.bool,
      onClickOutside: PropTypes.func
    },

    getInitialState() {
      return{
        showing: false
      }
    },

    componentWillReceiveProps(nextProps){
      this.setState({
        showing: nextProps.showing
      })
      if(!nextProps.showing){
         document.getElementById("content").style.webkitFilter = "blur(0px)"
         removeClass('popup-open', document.body);

      }else{
          this.applyBlur()
          addClass('popup-open', document.body);
      }
    },

    applyBlur(){
      document.getElementById("content").style.webkitFilter = "blur(2px)"
    },


    handleClickOutside: function(evt) {
      this.props.onClickOutside()
    },
    
    getParent() {
      return document.querySelector('#popup-container');
    },


  render() {
     const style = {
        overlay : {
          position          : 'fixed',
          top               : 0,
          left              : 0,
          right             : 0,
          bottom            : 0,
          backgroundColor   : "none",
          zIndex : 1000,
          pointerEvents   : "none"
        },
        content : {
          position                   : 'absolute',
          overflow                   : 'auto',
          WebkitOverflowScrolling    : 'touch',
          outline                    : 'none',
          padding                    : '20px',
          border: 'none',
          background: 'none',
          pointerEvents   : "none"


        }
      }


    return (
      <Modal
        style={style}
        isOpen={true}
        contentLabel="popup"
      >
             <div
                className={"filter-background" + (this.state.showing ? " active" :"")}
                style={{
                  position: 'fixed',
                  zIndex: '1000',
                  left: '0',
                  top: '0',
                  width: '100%',
                  height: '100% ',
                  overflow: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: "10px",
                }}
                onClick={this.handleClickOutside}
              >

                <div
                  style={{
                    padding:"20px",
                    paddingTop: '5px',
                    minWidth: '300px',
                    width: this.props.width ? this.props.width  : null,
                    backgroundColor: this.props.noBackground ? "transparent" : "white",
                    zIndex: '1001',
                  }}
                  className={"card popup" + (this.state.showing ? " active":"")}
                  onClick={function(event){
                    event.stopPropagation()
                  }}

                >
                  <div
                    style={{
                      textAlign: 'right',
                      width: '100%',

                    }}
                  >
                    <span
                      style={{
                        color: '#aaaaaa',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                      onClick={this.handleClickOutside}
                    >×</span>
                  </div>
                  {this.props.children}
                </div>
              </div>
      </Modal>
  )}})

export default Popup

