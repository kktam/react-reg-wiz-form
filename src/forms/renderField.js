import React from 'react'
import styles from './renderField.css'

const renderField = ({ input, disabled, copyAddressValue, label, type, meta: { touched, error }, onKeyUp, onFocus }) =>
  <div className="renderField">
    <label>
      {label}
    </label>
    <div>
      {!disabled && <input 
        {...input} 
        className="renderField__input"
        placeholder={label} 
        type={type}
        onKeyUp={onKeyUp}
        onFocus={onFocus} />}
      {disabled && <input 
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
