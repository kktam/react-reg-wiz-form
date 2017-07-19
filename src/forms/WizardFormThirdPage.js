import React from 'react'
import { Field, reduxForm } from 'redux-form'
import renderField from './renderField'
import renderChoice from './renderChoice'
import renderGeoField from './renderGeoField'
import validate from './validate'
import normalizePhone from './normalizePhone'

function addressChanged(val) {
  console.log("GEO Selected: " + JSON.stringify(val));
}

const WizardFormThirdPage = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props
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
        <label htmlFor="employed">Employed</label>
        <div>
          <Field
            name="employed"
            id="employed"
            component="input"
            type="checkbox"
          />
        </div>
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
export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage)
