import React, { PropTypes } from 'react'
import ToggleButton from './ToggleButton'
import Radium from 'radium'

var ToggleButtonHandler = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    preToggled: PropTypes.arrayOf(PropTypes.string)
  },

 getDefaultProps() {
     return {
       rounded: true,
       columns: 3,
       genres: [],
       preToggled: [],
       errorAbove: false
     }
   },

   getInitialState(){
     return {
        toggledButtons: [],
        errors: []
     }
   },

   contextTypes: {
     isFormValid: PropTypes.func,
     registerValidation: PropTypes.func.isRequired,
     updateProfileValue: PropTypes.func
   },



   componentWillMount() {

     this.setState({
       toggledButtons: this.props.preToggled
     })
     this.removeValidationFromContext = this.context.registerValidation(show =>
       this.isValid(show))

   },

   componentWillReceiveProps(nextProps){


      this.setState({
        toggledButtons: nextProps.preToggled
      })

   },

   componentWillUnmount() {
     this.removeValidationFromContext()
   },

   isValid(showErrors) {
      const errors = this.state.toggledButtons.length ? [] : ["At least 1 genre should be selected"]
      if (showErrors) {
        this.setState({
          errors
        })
      }

      return !errors.length
   },

  spliceHelper(list, index){
    list.splice(index,1)
    return list
  },

  timer : null,

  updateValue(value){
    var toggledButtons = this.state.toggledButtons
    var valueIndex = toggledButtons.indexOf(value)

    var newList = (valueIndex===-1)
                   ? [ ...toggledButtons, value ]
                   : this.spliceHelper(toggledButtons, valueIndex)

    this.setState({
       toggledButtons: newList,
    }, ()=>  {
      if (this.context.isFormValid) {
        this.context.isFormValid(false)
      }})

      clearTimeout(this.timer)
      this.timer = setTimeout(() =>
        this.context.updateProfileValue(this.props.name, newList), 1000)


  },

  handleButtonPress(value) {
    setTimeout(() => this.isValid(true), 0)
    this.updateValue(value)
 },

  render() {
    var styles = {
      base: {
        width: "100%",
        tableLayout: "fixed",
          },
      td:{
        paddingRight: '15px',
      },
      tr:{
        height: '50px',
      },
      errors:{
        marginTop: '5px',
        marginBottom: '5px',
        position: 'relative',
        fontSize: '12px',
        lineHeight: '12px',
        color: 'rgb(244, 67, 54)',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        WebkitTransition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
      }

    }
    var rows = []
    var buttons = []
    var currentRow = 0
    this.props.genres.forEach(function(genre, i) {

      var isToggled = false
      var toggledButtons = this.state.toggledButtons

      if (toggledButtons.indexOf(genre.name)!==-1){
        isToggled = true
      }



      //Adding to array
      buttons.push(
        <td
          style={styles.td}
          key={genre.name}>
          <ToggleButton
            rounded= {this.props.rounded}
            label =  {genre.name}
            active = {isToggled}
            disabled = {this.props.disabled}
            onClick = {this.handleButtonPress}/>
        </td>  )

      if ((i+1) % this.props.columns===0 && i!==0 || (i===this.props.genres.length-1)){
        currentRow++
        rows.push(
          <tr
          style={styles.tr}
          key={currentRow}>
            {buttons}
          </tr>
          )
          buttons = []
      }
    }.bind(this))

    return (
      <div>
        {(this.state.errors.length && this.props.errorAbove) ? (
          < div style = {styles.errors}>
          {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
          </div>
          ) : null}

          <table
          style={[
          styles.base]}>
          <tbody>{rows}</tbody>
          </table>
          {(this.state.errors.length && !this.props.errorAbove) ? (
          < div style = {styles.errors}>
          {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
          </div>
          ) : null}
          </div>
          )
          }
          })

          ToggleButtonHandler = Radium(ToggleButtonHandler)



export default ToggleButtonHandler
