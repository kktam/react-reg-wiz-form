import React, { Component } from 'react';
import { Link , Route, Redirect } from 'react-router-dom'
import belle from 'belle'
import Progress from 'react-progress';
import logo from './logo.svg';
import './App.css';
import WizardForm from './forms/WizardForm';
import RegistrationSuccess from './components/RegistrationSuccess';
import { getUserById, submitFormData } from './api/users';
import Gem from './animation/Gem';

// Redux stores
import { EnvOptions, setEnv } from './store/envAction'
import appEnvStore from './store/envStore';

// company information
const COMPANY = "ACME"
// constants
const MAX_PERCENT = 100
const URL_BACKGROUND = 'https://source.unsplash.com/1900x300/?business'

class App extends Component {
  constructor(props){
    super(props)
    this.getBackground = this.getBackground.bind(this)
    this.onFinalFormValidation = this.onFinalFormValidation.bind(this)
    this.onFinalFormValidationCallbackPass = this.onFinalFormValidationCallbackPass.bind(this)        
    this.onFinalFormValidationCallbackFail = this.onFinalFormValidationCallbackFail.bind(this)        
    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.onSubmitCallback = this.onSubmitCallback.bind(this) 
    this.tick = this.tick.bind(this)                 
    this.state = {
      env: this.props.env,

      backgroundUrl: null,

      submitting: false,
      submitPercent: 0,
      submitPeriod: 300,
      submitCompleted: false
    };
    this.submitFormData = null;

    // log global store
    var envOption;
    switch (this.props.env) {
      case 'prod': envOption = EnvOptions.PROD; break;
      case 'qa': envOption = EnvOptions.QA; break;
      case 'dev': envOption = EnvOptions.DEVELOPMENT; break; 
      case 'test': envOption = EnvOptions.TEST; break;               
    }
    appEnvStore.dispatch(setEnv(envOption));

    this.getBackground();
  }

  getBackground () {
    if (this.state.env !== 'prod') {
      return;
    }
    
    fetch(URL_BACKGROUND)
      .then(res => res)
      .then(data => {
        const { url } = data
        this.setState({ backgroundUrl: url })
      })
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
    // Pass new image to background
    const style = {
      backgroundImage: `url(${this.state.backgroundUrl})`,
      backgroundSize: 'cover',
    }

    return (
      <div className="App">
        <div className="App-header" style={style}>
          <Gem width="180" height="60" 
               lineColor="rgba(245,252,210,0.1)"
               className="App-logo-svg" ></Gem>
          <div className="App-Title"> {COMPANY} - Sign up form</div>
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
        </div>
      </div>
    );
  }
}

export default App;
