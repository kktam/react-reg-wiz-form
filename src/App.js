import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WizardForm from './forms/WizardForm'
import apigClientFactory from 'aws-api-gateway-client'

let config = {
  invokeUrl:'https://.execute-api.us-west-2.amazonaws.com',
  //apiKey: ''
};
let apigClient = apigClientFactory.newClient(config);

const showResults = values => {
  new Promise(resolve => {
    setTimeout(() => {
      // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })

  var params = {
    //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
  };
  // Template syntax follows url-template https://www.npmjs.com/package/url-template
  var pathTemplate = '/prod/add_user'
  var method = 'GET';
  var additionalParams = {
    //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    queryParams: {
      TableName: 'users'
    }
  };
  var body = {
    //This is where you define the body of the request
  }; 

  apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
    .then(function(result){
        //This is where you would put a success callback
        console.log(result);
    }).catch( function(result){
        //This is where you would put an error callback
    });
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
