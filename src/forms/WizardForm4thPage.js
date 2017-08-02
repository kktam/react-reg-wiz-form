import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import renderField from './renderField'
import renderChoice from './renderChoice'
import validate from './validate'
import normalizePhone from './normalizePhone'
import MaskedInput from './MaskedInput'
import renderCreditCard from './renderCreditCard'

const paymentOptions = ['Visa', 'Master Card', 'American Express', 'Pay Pal']
let cvc = null;

function creditCardChanged(val) {

}

let WizardForm4thPage = class WizardForm4thPage extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)           
    this.state = {
      number: (props.number) ? props.number : '',
      name: (props.name) ? props.name : '',
      exp: (props.expiry) ? props.expiry : '',
      cvc: (props.cvc) ? props.cvc : '',
      focused: '',
    };
  }

  handleSubmit(result) {
    if (this.props.handleSubmit != null) {
      this.props.handleSubmit(result);
    }
  }

  render () {
  const { handleSubmit, pristine, previousPage, submitting, paymentOptionsSelected, creditCardSelected } = this.props
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
        <renderCreditCard name="creditCard" 
          {...this.props}
          type="text" 
          label="Credit Card"        
          onChange={creditCardChanged} />      
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
const mapStateToProps = state => selector(state, 'number', 'name', 'expiry', 'cvc')

WizardForm4thPage = connect(
  state => ({
    paymentOptionsSelected: selector(state, 'paymentOptions'),
    creditCardSelected: selector(state, 'creditCard')
  })
)(WizardForm4thPage)

export default WizardForm4thPage
