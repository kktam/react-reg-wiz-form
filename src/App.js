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
import { getImageAverageColorOnElement } from './util/getImageAverageColor';

// Redux stores
import { EnvOptions, setEnv } from './store/envAction';
import appEnvStore from './store/envStore';
import { getValue } from './store/globalCacheAction';
import globalCacheStore from './store/globalCacheStore';

// company information
const COMPANY = "ACME";
// constants
const MAX_PERCENT = 100;

// a CORS proxy that allows enables cross-origin requests to anywhere.
const URL_CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const URL_BACKGROUND = 'https://source.unsplash.com/1900x300/?business';

class App extends Component {
  backgroundAvgColor = null;
  imagePromise = null;
  backgroundNode = null;

  constructor(props){
    super(props)
    this.getBackground = this.getBackground.bind(this)
    this.onBackgroundLoaded = this.onBackgroundLoaded.bind(this)
    this.onRendered = this.onRendered.bind(this)
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

  componentWillMount() {
  }

  componentDidMount() {
    if (this.imagePromise == null) {
      return;
    }

    setTimeout(this.onRendered, 5000);
  }

  componentDidUpdate() {
  }

  onRendered() {
    // disable analysis until Canvas issue is resolved.
    //this.imagePromise.then(this.onBackgroundLoaded, null);
  }

  /*
   * Get a randomized image to decorate the application
   */ 
  getBackground () {
    if (this.state.env !== 'prod') {
      return;
    }
    
    this.imagePromise = fetch(URL_CORS_PROXY + URL_BACKGROUND)
      .then(res => res)
      .then(data => {
        const { url } = data
        this.setState({ backgroundUrl: url })
      })
  }

  /*
   * Event triggered when the background image is loaded
   * This function will analyze the background image, and 
   * adjust the color of the Gem to ensure the Gem always
   * stands out from the background
   */
  onBackgroundLoaded() {
    // analyze the background image
    this.backgroundAvgColor = getImageAverageColorOnElement(this.backgroundNode);
    console.log('Background average color = ' + JSON.stringify(this.backgroundAvgColor));
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
    // TBD - make a session key
    var session = 123;
    let val = globalCacheStore.dispatch(getValue(session)); 

    console.log("getting from globalCacheStore: " + JSON.stringify(val));


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
    const backgroundStyle = {
      backgroundImage: (this.state.backgroundUrl == null) ? 'url("")' : `url(${this.state.backgroundUrl})`,
      backgroundSize: 'cover',
    }

    const imageStyle = {
      display: 'hidden',
    }    

    return (
      <div className="App">
        <div id="App-header" className="App-header" 
             style={backgroundStyle}>
          <Gem width="180" height="60" 
               lineColor="rgba(245,252,210,0.4)"
               timeout="200"
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
        <img id="App-BkImg" src={URL_BACKGROUND} 
               alt="Rotating background" 
               width="0px;" 
               height="0px;"
               style ={imageStyle}
               ref={node => this.backgroundNode = node} />
      </div>
    );
  }
}

export default App;
