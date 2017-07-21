import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import renderField from './renderField'
import renderChoice from './renderChoice'
import renderGeoField from './renderGeoField'
import validate from './validate'
import normalizePhone from './normalizePhone'

function addressChanged(val) {
  console.log("GEO Selected: " + JSON.stringify(val));
}

let WizardFormThirdPage = props => {
  const { handleSubmit, pristine, previousPage, submitting, address, isBillingSameValue } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>       
        <Field name="address" type="text" component={renderGeoField} label="Address" onChange={addressChanged} />      
      </div>         
      <div>
        <label>Favorite Color</label>
        <Field name="favoriteColor" component={renderChoice} />
      </div>
      <div>
        <label htmlFor="isBillingSame">is Same As Home Address</label>
        <div>
          <Field
            name="isBillingSame"
            id="isBillingSame"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>       
        {!isBillingSameValue && <Field name="billing_address" 
            type="text" component={renderGeoField} 
            label="Billing Address" 
            disabled={isBillingSameValue} />}
        {isBillingSameValue && <Field name="billing_address" 
            type="text" component={renderField} 
            label="Billing Address"
            copyAddressValue={address}
            disabled={isBillingSameValue} />}                
      </div>     
      <div>
        <label>Phone</label>
        <div>
          <Field
            name="phone"
            component={renderField}            
            type="text"
            placeholder="Phone Number"
            normalize={normalizePhone}
          />
        </div>
      </div>      
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" placeholder="Notes" />
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
  )
}

WizardFormThirdPage = reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage)

const selector = formValueSelector('wizard')

WizardFormThirdPage = connect(
  state => ({
    isBillingSameValue: selector(state, 'isBillingSame'),
    address: selector(state, 'address')
  })
)(WizardFormThirdPage)

export default WizardFormThirdPage
