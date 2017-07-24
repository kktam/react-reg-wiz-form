import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import $ from 'jquery'
import Card from 'card'
import 'card/dist/card.css'

class renderCreditCard extends Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)           
    this.state = { select: "none", typed: "none" }  
  }

  componentDidMount() {
      if (this._creditCard != null) {
          const { creditCardRef } = this.refs;
          this._creditCard = $(creditCardRef);

          this._creditCard = new Card({
              
              // a selector or DOM element for the form where users will
              // be entering their information
              form: 'creditCardForm', // *required*
              // a selector or DOM element for the container
              // where you want the card to appear
              container: '.card-wrapper', // *required*

              formSelectors: {
                  numberInput: 'input#number', // optional — default input[name="number"]
                  expiryInput: 'input#expiry', // optional — default input[name="expiry"]
                  cvcInput: 'input#cvc', // optional — default input[name="cvc"]
                  nameInput: 'input#name' // optional - defaults input[name="name"]
              },

              width: 200, // optional — default 350px
              formatting: true, // optional - default true

              // Strings for translation - optional
              messages: {
                  validDate: 'valid\ndate', // optional - default 'valid\nthru'
                  monthYear: 'mm/yyyy', // optional - default 'month/year'
              },

              // Default placeholders for rendered fields - optional
              placeholders: {
                  number: '•••• •••• •••• ••••',
                  name: 'Full Name',
                  expiry: '••/••',
                  cvc: '•••'
              },

              masks: {
                  cardNumber: '•' // optional - mask card number
              },

              // if true, will log helpful messages for setting up Card
              debug: false // optional - default false
          });
      }
  }

  onChange(d) {
    // debug
    //window.alert(`renderCreditCard onChange data:\n\n${JSON.stringify(d, null, 2)}`)

    this.setState({ typed: d })
    // if (this.props.input.onChange != null) {
    //   this.props.input.onChange(d);
    // }
  }    

  render() {
    const { input: { value, onChange }, label, type, meta: { touched, error } } = this.props

    return (
      <div id="creditCardContainer" className="">
        <label>
          {label}
        </label>
        <div id="creditCardFormWrapper">
          <div id="creditCardForm" ref="creditCardForm" />
          <div className="form-container active">
            <input placeholder="Card number" type="tel" name="number" />
            <input placeholder="Full name" type="text" name="name" />
            <input placeholder="MM/YY" type="tel" name="expiry" />
            <input placeholder="CVC" type="number" name="cvc" />
          </div>
          {touched &&
            error &&
            <span>
              {error}
            </span>}
        </div>
      </div>
    )
  }
}

renderCreditCard.propTypes = {
  onChange: PropTypes.func, 
  input: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.any,
    error: PropTypes.any
  })

};

export default renderCreditCard