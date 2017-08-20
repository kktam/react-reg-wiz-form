import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import reducer from './forms/reducer'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer)

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>, 
    document.getElementById('root'));
registerServiceWorker();
