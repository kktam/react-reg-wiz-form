import React from 'react';
import _ from 'lodash';
import uuidv1 from 'uuid'
import createCORSRequest from './cors'
import { AWS_API_INSTANCE, API_KEY } from './config'

export const submitFormData = (values, callback) => {

  // validate primary key before submitting
  if (typeof values.number === "undefined" || values.number == null) {
    window.alert(`credit card number missing, please try again!\n\n`)  
    return null;  
  }

  // append primary key to data
  values["id"] = values.number.replace(/ /g, "");
  values["userId"] = uuidv1();  

  let awsData = {};

  // debug
  //window.alert(`You made aws data:\n\n${JSON.stringify(awsData, null, 2)}`)

  let postData = values;

  // eslint-disable-next-line
  let postDataStr = JSON.stringify(postData);

  new Promise(resolve => {
    setTimeout(() => {
      // simulate server latency
      //console.log(`You submitted:\n\n${JSON.stringify(postData, null, 2)}`)
      resolve()
    }, 500)
  })

  var url = 'https://' + AWS_API_INSTANCE + '.execute-api.us-west-2.amazonaws.com/latest/user';
  var method = 'POST';
  var xhr = createCORSRequest(method, url);

  xhr.onload = function () {
    var result = xhr.responseText;
    // Success code goes here.
    console.log(`aws success:\n\n${JSON.stringify(result, null, 2)}`)

    if (typeof callback === 'function' && callback != null) {
      callback(result);
    }
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
export const getUserById = (id, callbackPass, callbackFail) => {
  var url = 'https://' + AWS_API_INSTANCE + '.execute-api.us-west-2.amazonaws.com/prod/user/' + id;
  var method = 'GET';
  var xhr = createCORSRequest(method, url);

  xhr.onload = function () {
    var result = xhr.responseText;
    // Success code goes here.
    console.log(`aws success:\n\n${JSON.stringify(result, null, 2)}`)
    
    if (typeof callbackPass === 'function' && callbackPass != null) {
      callbackPass(result);
    }
  };

  xhr.onerror = function () {
    var result = xhr.responseText;    
    // Error code goes here.
    console.log(`aws failed:\n\n${JSON.stringify(result, null, 2)}`)  
    
    if (typeof callbackFail === 'function' && callbackFail != null) {
      callbackFail(result);
    }    
  };

  xhr.setRequestHeader('accept-language', 'en-US,en;q=0.8');
  xhr.setRequestHeader('accept', 'application/json');
  xhr.setRequestHeader('x-api-key', API_KEY);
  xhr.send();
}


// eslint-disable-next-line
export const getAllUsers = () => {
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