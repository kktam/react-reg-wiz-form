import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WizardForm from './forms/WizardForm';

var createCORSRequest = function(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Most browsers.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
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
  new Promise(resolve => {
    setTimeout(() => {
      // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })

  var url = 'https://.execute-api.us-west-2.amazonaws.com/prod/add_user';
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

  xhr.setRequestHeader('accept-encoding', 'gzip, deflate');
  xhr.setRequestHeader('accept-language', 'en-US,en;q=0.8');
  xhr.setRequestHeader('accept', 'application/json');
  xhr.setRequestHeader('x-api-key', '');
  xhr.setRequestHeader('TableName', 'users');
  xhr.send();
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <WizardForm onSubmit={showResults} />
      </div>
    );
  }
}

export default App;
