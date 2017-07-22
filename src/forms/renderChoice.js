import React from 'react'

const renderChoice = ({ input, choices, meta: { touched, error } }) =>
  <div>
    <select {...input}>
      <option value="">Select a color...</option>
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