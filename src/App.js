import React, { Component } from 'react';
import { Link , Route, Redirect } from 'react-router-dom'
import Progress from 'react-progress';
import logo from './logo.svg';
import './App.css';
import WizardForm from './forms/WizardForm';
import RegistrationSuccess from './components/RegistrationSuccess';
import submitFormData from './api/users'

// company information
const COMPANY = "ACME"
// constants
const MAX_PERCENT = 100

class App extends Component {
  constructor(props){
    super(props)
    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.onSubmitCallback = this.onSubmitCallback.bind(this) 
    this.tick = this.tick.bind(this)                   
    this.state = {
      submitting: false,
      submitPercent: 0,
      submitPeriod: 300,
      submitCompleted: false
    };
  }
  
  tick () {
    this.setState({submitPercent: this.state.submitPercent + 1});
    if (this.state.secondsRemaining >= MAX_PERCENT) {
      clearInterval(this.interval);
    }
  }

  onSubmitForm (values) {
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
          ( <WizardForm onSubmit={this.onSubmitForm} /> )
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
