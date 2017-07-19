import React from 'react'

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']

const renderChoice = ({ input, meta: { touched, error } }) =>
  <div>
    <select {...input}>
      <option value="">Select a color...</option>
      {colors.map(val =>
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