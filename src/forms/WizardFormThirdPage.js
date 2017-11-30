import React, { Component } from 'react'
import belle from 'belle'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector, getFormValues, getState } from 'redux-form'
import renderField from './renderField'
import renderChoice from './renderChoice'
import renderGeoField from './renderGeoField'
import validate from './validate'
import normalizePhone from './normalizePhone'
import WizardFormFirstPage from './WizardFormFirstPage'

// Redux stores
import { setKeyValue } from '../store/globalCacheAction'
import globalCacheStore from '../store/globalCacheStore';

var Button = belle.Button;

let WizardFormThirdPage = class WizardForm4thPage extends Component {
  constructor(props){
    super(props)

    this.addressChanged = this.addressChanged.bind(this);
  }

  addressChanged(val) {  
    console.log("GEO Selected: " + JSON.stringify(val));

    //var formValues = getFormValues("WizardFormFirstPage");
    //console.log("first form data = " + formValues);

    // TBD - make a session key
    var session = 123;
    globalCacheStore.dispatch(setKeyValue(session, val));  
    
    // save special items in Redux form
    //this.props.change("WizardFormThirdPage", "address", val.label);    
    //this.props.change("WizardFormThirdPage", "address_componments", JSON.stringify(val.address_components));
    //this.props.change("WizardFormThirdPage", "address_geometry", JSON.stringify(val.geometry));    
  }

  render() {
    const { handleSubmit, pristine, previousPage, submitting, address, isBillingSameValue } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="address" type="text" component={renderGeoField} label="Address" onChange={this.addressChanged} />
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
            copyAddressValue={address.label}
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
          <Button type="button" className="previous" onClick={previousPage}>
            Previous
        </Button>
          <Button type="submit" className="next">
            Next
        </Button>
        </div>
      </form>
    )
  }
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
