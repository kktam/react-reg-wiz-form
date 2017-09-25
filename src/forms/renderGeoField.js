import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import belle from 'belle'
import Geosuggest from 'react-geosuggest'
import styles from './renderGeoField.css';
import { METER_PER_KM } from '../constants/measurements';

var Button = belle.Button;

/*
 * Address map component
 * using Google Map to determine address auto-complete
 * on address field, and geolocation to refine search choices
 */
class renderGeoField extends Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onSuggestSelect = this.onSuggestSelect.bind(this)
    this.onFindNearMe = this.onFindNearMe.bind(this)
    this.geoSuccess = this.geoSuccess.bind(this)
    this.geoError = this.geoError.bind(this)                    
    this.state = { select: "none", 
                   typed: "none",
                   geolocation: false,
                   startLat: null,
                   startLon: null,
                   radius: 200 * METER_PER_KM }

    // check for geolocation support
  }

  initGeoLocation() {
    // check for Geolocation support
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
      this.state.geolocation = true;
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }
  }

  componentWillMount() {
    this.initGeoLocation();
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
  
  geoSuccess(position) {
    this.state.startLat = position.coords.latitude;
    this.state.startLon = position.coords.longitude;
  }

  geoError(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  }

  onFindNearMe(d) {
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
  }

  render() {
    const { input: { value, onChange }, label, type, meta: { touched, error } } = this.props

    // convert geolocation to Google Map format
    // https://developers.google.com/maps/documentation/javascript/reference#LatLng
    var gmapLatLng = null;
    if (this.state.geolocation) {
      if (typeof window.google !== 'undefined') {
        gmapLatLng = new window.google.maps.LatLng({lat: this.state.startLat, lng: this.state.startLon}); 
      }
    }

    return (
      <div className="geosuggest-label">
        <label>
          {label}
        </label>
        <div>
          {this.state.geolocation && <Geosuggest
            value = {value}
            placeholder={label}
            type={type}
            onChange={this.onChange}
            onSuggestSelect={this.onSuggestSelect}
            styles={styles}
            location={gmapLatLng}
            radius={this.state.radius}
          />}
          {!this.state.geolocation && <Geosuggest
            value = {value}
            placeholder={label}
            type={type}
            onChange={this.onChange}
            onSuggestSelect={this.onSuggestSelect}
            styles={styles}
          />}          
          <Button type="button" className="previous" onClick={this.onFindNearMe}>
            Find Near Me
          </Button>          
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