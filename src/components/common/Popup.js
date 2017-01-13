import React, { PropTypes } from 'react'


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
    },

    applyBlur(){
      //document.getElementById("content").style.webkitFilter = "blur(2px)"
    },


    handleClickOutside: function(evt) {
  //    document.getElementById("content").style.webkitFilter = "blur(0px)"
      this.props.onClickOutside()
    },

  render() {
    if (this.state.showing)
      {this.applyBlur()}
    return (

      <div>


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



      </div>
  )}})

export default Popup
