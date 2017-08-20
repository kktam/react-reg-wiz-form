import React, { Component } from 'react';
import { Link , Route, Redirect } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import WizardForm from './forms/WizardForm';
import RegistrationSuccess from './components/RegistrationSuccess';
import submitFormData from './api/users'

// company information
const COMPANY = "ACME"

class App extends Component {
  constructor(props){
    super(props)
    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.onSubmitCallback = this.onSubmitCallback.bind(this)                
    this.state = {
      submitCompleted: false
    };
  }
  
  onSubmitForm (values) {
    submitFormData(values, this.onSubmitCallback);
  }

  onSubmitCallback(results) {
    if (typeof results !== "undefined" && results != null) {
      // record the form submit as completed
      this.setState( { submitCompleted : true } );
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2> {COMPANY} - Sign up form</h2>
        </div>
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
