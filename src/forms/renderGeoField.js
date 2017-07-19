import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Geosuggest from 'react-geosuggest'
import styles from './renderGeoField.css';

class renderGeoField extends Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onSuggestSelect = this.onSuggestSelect.bind(this)             
    this.state = { select: "none", typed: "none" }  
  }

  onChange(d) {
    // debug
    //window.alert(`renderGeoField onChange data:\n\n${JSON.stringify(d, null, 2)}`)

    this.setState({ typed: d })
    // if (this.props.input.onChange != null) {
    //   this.props.input.onChange(d);
    // }
  }  

  onSuggestSelect(suggest) {
    // debug
    //window.alert(`renderGeoField onSuggestSelect data:\n\n${JSON.stringify(suggest, null, 2)}`)
    
    // trigger a change to Field element
    this.props.input.value = suggest.label;

    this.setState({ select: suggest.label })
    if (this.props.input.onChange != null) {
      this.props.input.onChange(suggest.label);
    }    
  }    

  render() {
    const { input: { value, onChange }, label, type, meta: { touched, error } } = this.props

    return (
      <div>
        <label>
          {label}
        </label>
        <div>
          <Geosuggest
            value = {value}
            placeholder={label}
            type={type}
            onChange={this.onChange}
            onSuggestSelect={this.onSuggestSelect}
            styles={styles}
          />
          {touched &&
            error &&
            <span>
              {error}
            </span>}
        </div>
      </div>
    )
  }
}

renderGeoField.propTypes = {
  onChange: PropTypes.func, 
  input: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.any,
    error: PropTypes.any
  })

};

export default renderGeoField