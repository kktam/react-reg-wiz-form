import React from 'react'
import Geosuggest from 'react-geosuggest'
import styles from './renderGeoField.css';

const renderGeoField = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <Geosuggest {...input} 
        placeholder={label} 
        type={type} 
        onChange={input.onChange} 
        styles={styles}
      />
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>

export default renderGeoField