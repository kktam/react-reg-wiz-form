import React from 'react'
import Geosuggest from 'react-geosuggest'


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
      />
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>

export default renderGeoField