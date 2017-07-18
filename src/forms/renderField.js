import React from 'react'
import styles from './renderField.css'

const renderField = ({ input, label, type, meta: { touched, error } }) =>
  <div className="renderField">
    <label>
      {label}
    </label>
    <div>
      <input 
        {...input} 
        className="renderField__input"
        placeholder={label} 
        type={type}
        styles={styles} />
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>

export default renderField
