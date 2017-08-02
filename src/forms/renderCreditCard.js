import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Field } from 'redux-form'
import Payment from 'payment'
import CreditCards from 'react-credit-cards'
import $ from 'jquery'

import './renderCreditCard.css'

class renderCreditCard extends Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)           
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

  onChange(d) {
    // debug
    //window.alert(`renderCreditCard onChange data:\n\n${JSON.stringify(d, null, 2)}`)

    this.setState({ typed: d })
    // if (this.props.input.onChange != null) {
    //   this.props.input.onChange(d);
    // }
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

  render() {
    const { name, number, expiry, cvc, focused } = this.props;
    return (
      <div className="creditCardContainer">
        <h1>React Credit Cards</h1>
        <div className="creditCardForm">
            <CreditCards
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />
            <div>
              <Field
                component="input"
                name="number"
                placeholder="Card number"
                type="tel"
                onKeyUp={this.handleInputChange}                
                onFocus={this.handleInputFocus}
              />
              <div>E.g.: 49..., 51..., 36..., 37...</div>              
            </div>
            <div>
              <Field
                component="input"
                name="name"
                placeholder="Name"
                type="text"
                onKeyUp={this.handleInputChange}                
                onFocus={this.handleInputFocus}
              />
            </div>
            <div>
              <Field
                component="input"
                name="expiry"
                placeholder="Valid Thru"
                type="tel"
                onKeyUp={this.handleInputChange}                
                onFocus={this.handleInputFocus}
              />
            </div>
            <div>
              <Field
                component="input"
                name="cvc"
                placeholder="CVC"
                type="tel"
                onKeyUp={this.handleInputChange}                
                onFocus={this.handleInputFocus}
              />
            </div>                                                        
            <div>
              <input
                type="tel"
                name="cvc"
                placeholder="CVC"
                onKeyUp={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
        </div>
      </div>
    );
  }
}

renderCreditCard.propTypes = {
  number: PropTypes.number.optional,
  name: PropTypes.string.optional,
  expiry: PropTypes.string.optional,
  cvc: PropTypes.string.optional,  
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