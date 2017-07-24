import React, { Component } from 'react'
import { PropTypes } from 'prop-types'


class MaskedInput extends Component {
  constructor(props) {
    super()

    this.handleBlur = this.handleBlur.bind(this)    
    this.handleChange = this.handleChange.bind(this)    
    this.state = {
      value: props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    })
  }

  handleBlur() {
    if (this.props.onBlur) {
      // Swallow the event to prevent Redux Form from
      // extracting the form value
      this.props.onBlur()
    }
  }

  handleChange(event) {
    const value = event.target.value

    // Update the internal state to trigger a re-render
    // using the formatted value
    this.setState({value})

    if (this.props.onChange) {
      // Notify the normalized value
      this.props.onChange(
        this.props.normalize(value)
      )
    }
  }

  render() {
    return (
      <input
        {...this.props}
        value={this.props.format(this.state.value)}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    )
  }
}

MaskedInput.defaultProps = {
  format: x => x,
  normalize: x => x,
}

MaskedInput.propTypes = {
  format: PropTypes.func.isRequired,
  normalize: PropTypes.func.isRequired,
  value: PropTypes.any,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
}

export default MaskedInput