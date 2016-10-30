import React, { PropTypes } from 'react'

export const Collapsible = React.createClass({
  propTypes: {
    name: PropTypes.string,
    label: PropTypes.string,
    number: PropTypes.number,
    collapsed: PropTypes.bool,
    handleClick: PropTypes.func
  },

  render() {
    return(
      <div>
      <div className={
        this.props.collapsed ? "collapsible collapsed" : "collapsible active"}>

        <div
        onClick={() => this.props.handleClick(this.props.number)}
        style={{
        cursor:"pointer",
        paddingTop: '5px',
        height: '50px'
      }}
        >
      <h4
      style={{marginBottom:"15px"}}
      >  {this.props.number + ". " + this.props.label} </h4>
      <span>
      <svg viewBox="0 0 24 24"
        style={{
                position: "absolute",
                right: "15px",
                top: "12px",
                display: "inline-block",
                color: "rgba(0, 0, 0, 0.870588)",
                fill: "currentcolor",
                height: "24px",
                width: "24px",
                webkitUserSelect: "none"}}>
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
      </svg>
      </span>
        </div>

            {this.props.children}

      </div>
      <div className="divider"/>
      </div>


  )

  }
})

export const CollapsibleContainer = React.createClass({
  propTypes: {

  },

  getInitialState(){
    return {
      activeChild: 1
    }
  },

  toggleChild(count){
    this.setState({
      activeChild: count
    })
  },

  renderChildren(){
    var count = 0
    return React.Children.map(this.props.children, child => {
      count++
      return React.cloneElement(child, {
        number: count,
        collapsed: count !== this.state.activeChild,
        handleClick: this.toggleChild
      })
  })
},

  render() {
    return(
      <div className="collapsible-container">
        {this.renderChildren()}
      </div>)

  }
})
