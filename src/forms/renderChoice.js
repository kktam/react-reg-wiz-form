import React from 'react'

const renderChoice = ({ input, label, choices, meta: { touched, error } }) =>
  <div>
    <select {...input}>
      <option value="">{label}</option>
      {choices.map(val =>
        <option value={val} key={val}>
          {val}
        </option>
      )}
    </select>
    {touched &&
      error &&
      <span>
        {error}
      </span>}
  </div>

export default renderChoice;