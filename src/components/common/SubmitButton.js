import React, { PropTypes } from 'react'
import Button from './Button'

export default React.createClass({

  propTypes:{
    onClick: PropTypes.func,
  },

  contextTypes: {
      onSubmit: PropTypes.func,
    },

    handleClick(e){
    this.context.onSubmit()
    this.props.onClick()
    },

  render() {
  return(
  <Button
  {...this.props}
  onClick={this.handleClick}
  />
  )
  }
})
