import React, { Component } from 'react';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';
import WizardForm from './forms/WizardForm';

// company information
const COMPANY = "ACME"

// Amazon API Gateway deployment information 
const AWS_API_INSTANCE = '';
const API_KEY = '';

var createCORSRequest = function(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Most browsers.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== "undefined") {
    // IE8 & IE9
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

const showResults = values => {

  // append primary key to data
  values["id"] = _.uniqueId();
  values["userId"] = values["id"];  

  let awsData = {};

  // debug
  //window.alert(`You made aws data:\n\n${JSON.stringify(awsData, null, 2)}`)

  let postData = values;

  // eslint-disable-next-line
  let postDataStr = JSON.stringify(postData);

  new Promise(resolve => {
    setTimeout(() => {
      // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(postData, null, 2)}`)
      resolve()
    }, 500)
  })

  var url = 'https://' + AWS_API_INSTANCE + '.execute-api.us-west-2.amazonaws.com/latest/user';
  var method = 'POST';
  var xhr = createCORSRequest(method, url);

  xhr.onload = function () {
    var result = xhr.responseText;
    // Success code goes here.
    window.alert(`aws success:\n\n${JSON.stringify(result, null, 2)}`)    
  };

  xhr.onerror = function () {
    var result = xhr.responseText;    
    // Error code goes here.
    window.alert(`aws failed:\n\n${JSON.stringify(result, null, 2)}`)    
  };

  xhr.setRequestHeader('Content-Type', 'application/json');  
  //xhr.setRequestHeader('x-api-key', API_KEY);
  xhr.send(postDataStr);
}

// eslint-disable-next-line
const getAllUsers = () => {
  var url = 'https://' + AWS_API_INSTANCE + '.execute-api.us-west-2.amazonaws.com/prod/add_user';
  var method = 'GET';
  var xhr = createCORSRequest(method, url);

  xhr.onload = function () {
    var result = xhr.responseText;
    // Success code goes here.
    window.alert(`aws success:\n\n${JSON.stringify(result, null, 2)}`)    
  };

  xhr.onerror = function () {
    var result = xhr.responseText;    
    // Error code goes here.
    window.alert(`aws failed:\n\n${JSON.stringify(result, null, 2)}`)    
  };

  xhr.setRequestHeader('accept-language', 'en-US,en;q=0.8');
  xhr.setRequestHeader('accept', 'application/json');
  xhr.setRequestHeader('x-api-key', API_KEY);
  xhr.send();
}

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
