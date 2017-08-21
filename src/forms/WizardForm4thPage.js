import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import renderField from './renderField'
import renderChoice from './renderChoice'
import validate from './validate'
import normalizePhone from './normalizePhone'
import MaskedInput from './MaskedInput'
import Payment from 'payment'
import CreditCards from 'react-credit-cards'
import browser from 'detect-browser';
import './WizardForm4thPage.css'

const paymentOptions = ['Visa', 'Master Card', 'American Express', 'Pay Pal']
let cvc = null;

function creditCardChanged(val) {

}

let WizardForm4thPage = class WizardForm4thPage extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)           
    this.state = {
      number: '',
      name: '',
      exp: '',
      cvc: '',
      focused: '',
    };
  }

  componentDidMount() {
    Payment.formatCardNumber(document.querySelector('[name="number"]'));
    Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
    Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
  }

  handleInputFocus = (e) => {
    const target = e.target;

    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = (e) => {
    const target = e.target;

    if (target.name === 'number') {
      this.setState({
        [target.name]: target.value.replace(/ /g, ''),
      });
    }
    else if (target.name === 'expiry') {
      this.setState({
        [target.name]: target.value.replace(/ |\//g, ''),
      });
    }
    else {
      this.setState({
        [target.name]: target.value,
      });
    }
  };

  handleCallback(type, isValid) {
    console.log(type, isValid); //eslint-disable-line no-console
  }

  handleSubmit(result) {
    if (this.props.handleSubmit != null) {
      this.props.handleSubmit(result);
    }
  }

  render () {
  const { handleSubmit, pristine, previousPage, submitting, paymentOptionsSelected, creditCardSelected } = this.props
  const { name, number, expiry, cvc, focused } = this.state;
  return (
    <form onSubmit={this.handleSubmit}>
      <div>
        <label>Payment Options</label>
        <Field name="paymentOptions" 
          component={renderChoice}
          label="Select a payment..." 
          choices={paymentOptions} />
      </div>      
      <div>       
      <div className="creditCardContainer">
        <h1>Enter Credit Card information</h1>
        <div className="creditCardForm">
          { browser.name != "ie" &&
          <CreditCards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          /> }
          <div>
            <Field
              component={renderField}
              type="tel"
              name="number"
              placeholder="Card Number"
              onKeyUp={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <div>E.g.: 49..., 51..., 36..., 37...</div>
          </div>
          <div>
            <Field
              component={renderField}
              type="text"
              name="name"
              placeholder="Name"
              onKeyUp={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div>
            <Field
              component={renderField}
              type="tel"
              name="expiry"
              placeholder="Valid Thru"
              onKeyUp={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <Field
              component={renderField}
              type="tel"
              name="cvc"
              placeholder="CVC"
              onKeyUp={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
        </div>
      </div>     
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  )}
}

WizardForm4thPage = reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardForm4thPage)

const selector = formValueSelector('wizard')

WizardForm4thPage = connect(
  state => ({
    paymentOptionsSelected: selector(state, 'paymentOptions'),
    creditCardSelected: selector(state, 'creditCard')
  })
)(WizardForm4thPage)

export default WizardForm4thPage
