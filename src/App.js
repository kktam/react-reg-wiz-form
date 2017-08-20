import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WizardForm from './forms/WizardForm';
import showResults from './api/users'

// company information
const COMPANY = "ACME"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2> {COMPANY} - Sign up form</h2>
        </div>
        <p className="App-intro">
        </p>
        <WizardForm onSubmit={showResults} />
        <div className="App-footer">
          <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a></div>
        </div>
      </div>
    );
  }
}

export default App;
