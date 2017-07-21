import React from 'react'
import styles from './renderField.css'

const renderField = ({ input, disabled, label, type, meta: { touched, error } }) =>
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
        styles={styles} />}
      {disabled && <input 
        {...input} 
        className="renderField__input"
        placeholder={label} 
        type={type}
        styles={styles}
        disabled />}        
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>

export default renderField
