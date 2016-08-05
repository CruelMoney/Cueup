import React, { PropTypes } from 'react'
import Button from '../common/Button'
import Textfield from 'material-ui/TextField'
import onClickOutside from 'react-onclickoutside'


const login = React.createClass({
    displayName: 'Login',

    propTypes: {
      login: PropTypes.func.isRequired,
      loginFacebook: PropTypes.func,
      loginSoundcloud: PropTypes.func,
    },

    getInitialState() {
      return{
        email: "",
        password: "",
        isValid: false,
      }
    },

    componentWillReceiveProps(nextProps){

    },

    setValidState(){
      if(this.state.email !== "" && this.state.password !== ""){
        this.setState({
          isValid: true
        })
      }else{
        this.setState({
          isValid: false
        })
      }
    },

    onChangeEmail(event){
          this.setState({
            email: event.target.value
          })

          this.setValidState()
    },

    onChangePassword(event){
          this.setState({
            password: event.target.value
          })

          this.setValidState()
    },


    login(){
      this.props.login(this.state.email,this.state.password)
    },


  render() {

    return (
<div>
      <div>
        <div style={{marginBottom:"10px"}} md={6}>
          <Button
            label= "Facebook"
            rounded = {true}
            onClick = {this.props.loginFacebook}
          />
        </div>
        <div  style={{marginBottom:"20px"}} md={6}>
          <Button

            label= "Soundcloud"
            rounded = {true}
            onClick = {this.props.loginSoundcloud}
          />
        </div>
      </div>
      <p style={{textAlign:"center"}}>OR</p>
      <div>
        <Textfield
          type = "email"
          fullWidth={true}
          floatingLabelText="Email"
          onChange={this.onChangeEmail}
        />
      </div>
      <div style={{marginBottom:'20px'}}>
        <Textfield
          type = "password"
          fullWidth={true}
          floatingLabelText="Password"
          onChange={this.onChangePassword}
        />
      </div>
      <div style={{marginBottom:'20px'}}>
        <Button
          medium={true}
          label= "Login"
          important = {this.state.isValid}
          rounded = {true}
          onClick = {this.login}
        />
      </div>
      <p style={{opacity:'0.5'}}>
        Forgot?
      </p>
    </div>
    )
    }
    })

export default login
