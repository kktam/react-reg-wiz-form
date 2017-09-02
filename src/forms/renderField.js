import React from 'react'
import belle from 'belle'
import styles from './renderField.css'

var TextInput = belle.TextInput;

const renderField = ({ input, disabled, copyAddressValue, label, type, meta: { touched, error }, onKeyUp, onFocus }) =>
  <div className="renderField">
    <label>
      {label}
    </label>
    <div>
      {!disabled && <TextInput 
        {...input} 
        className="renderField__input"
        placeholder={label} 
        type={type}
        onKeyUp={onKeyUp}
        onFocus={onFocus} />}
      {disabled && <TextInput 
        {...input} 
        className="renderField__input"
        placeholder={label} 
        type={type}
        value={copyAddressValue}
        disabled />}        
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>

export default renderField
