import React, { Component } from 'react';
import { Link , Route, Redirect } from 'react-router-dom'
import belle from 'belle'
import Progress from 'react-progress';
import logo from './logo.svg';
import './App.css';
import WizardForm from './forms/WizardForm';
import RegistrationSuccess from './components/RegistrationSuccess';
import { getUserById, submitFormData } from './api/users'

// company information
const COMPANY = "ACME"
// constants
const MAX_PERCENT = 100

class App extends Component {
  constructor(props){
    super(props)
    this.onFinalFormValidation = this.onFinalFormValidation.bind(this)
    this.onFinalFormValidationCallbackPass = this.onFinalFormValidationCallbackPass.bind(this)        
    this.onFinalFormValidationCallbackFail = this.onFinalFormValidationCallbackFail.bind(this)        
    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.onSubmitCallback = this.onSubmitCallback.bind(this) 
    this.tick = this.tick.bind(this)                   
    this.state = {
      submitting: false,
      submitPercent: 0,
      submitPeriod: 300,
      submitCompleted: false
    };
    this.submitFormData = null;
  }
  
  tick () {
    this.setState({submitPercent: this.state.submitPercent + 1});
    if (this.state.secondsRemaining >= MAX_PERCENT) {
      clearInterval(this.interval);
    }
  }

  onFinalFormValidation(values) {
    // backup form data
    this.submitFormData = values;

    this.setState( { submitting : true } );   
    this.interval = setInterval(this.tick, this.state.submitPeriod);

    // validate if this request is already is database
    getUserById(values.number.replace(/ /g, ""), this.onFinalFormValidationCallbackPass, this.onFinalFormValidationCallbackFail);
  }

  onFinalFormValidationCallbackPass(results) {
    if (typeof results === "undefined" || results == null) {
      // no good, there is a duplicate.
      window.alert('[Error 2] The credit card verification is not available at this time, please try again later...');    
      return;
    }

    if (results.hasOwnProperty("id")) {
      if (results.id == this.submitFormData.number.replace(/ /g, "")) {
        // no good, there is a duplicate.
        window.alert('The credit card has already been registered!\nPlease call call-center for support if this is not you.');
        return;
      }
    }

    // go on to submit the form
    this.onSubmitForm(this.submitFormData);
  }

  onFinalFormValidationCallbackFail(results) {
    // no good, there is a duplicate.
    window.alert('[Error 1] The credit card verification is not available at this time, please try again later...');    
  }

  onSubmitForm(values) {
    this.setState( { submitting : true } );   
    this.interval = setInterval(this.tick, this.state.submitPeriod); 
    submitFormData(values, this.onSubmitCallback);
  }

  onSubmitCallback(results) {
    if (typeof results !== "undefined" && results != null) {
      // record the form submit as completed
      this.setState( { submitCompleted : true } );
      this.setState( { submitting : false } );         
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2> {COMPANY} - Sign up form</h2>
        </div>
        { this.state.submitting && 
          <Progress 
            percent={this.state.submitPercent}
            color="rainbow"
            height="5"
            speed={this.state.submitPeriod}
          /> }
        <p className="App-intro">
        </p>
        <Route exact={true} path="/" render={() => (
          this.state.submitCompleted ?
          ( <Redirect to="/complete"/> ) :
          ( <WizardForm onSubmit={this.onFinalFormValidation} /> )
        )}/>
        <Route path="/complete" component={RegistrationSuccess} />
        <div className="App-footer">
          <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a></div>
        </div>
      </div>
    );
  }
}

export default App;
