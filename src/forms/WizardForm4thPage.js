import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import renderField from './renderField'
import renderChoice from './renderChoice'
import validate from './validate'
import normalizePhone from './normalizePhone'

const paymentOptions = ['Visa', 'Master Card', 'American Express', 'Pay Pal']

function creditCardChanged(val) {

}

let WizardForm4thPage = props => {
  const { handleSubmit, pristine, previousPage, submitting, paymentOptionsSelected, creditCardSelected } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Payment Options</label>
        <Field name="paymentOptions" 
          component={renderChoice}
          label="Select a payment..." 
          choices={paymentOptions} />
      </div>      
      <div>       
        <Field name="creditCard" 
          type="text" 
          component={renderField} 
          label="Credit Card" 
          placeholder="Credit Card number"
          normalize={normalizePhone}          
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
  )
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
