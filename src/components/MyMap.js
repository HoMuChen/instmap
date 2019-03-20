import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

import GoogleMapReact from 'google-map-react';

class MyMap extends React.Component {

  handleChange = ({ center, zoom, bounds }) => {
    if( Math.abs((center.lat - this.props.center.lat)/center.lat) > 0.000000000000001  ||
        Math.abs((center.lng - this.props.center.lng)/center.lng) > 0.000000000000001
      )
    {
      this.props.onCenterChange(center);
    }

    if( zoom !== this.props.zoom ) {
      this.props.onZoomChange(zoom);
    }
  }

  render() {
    const { center, zoom, locations, focusedLocation } = this.props;

    const style = { color: '#79a2b5' };
    const focusedStyle = { fontSize: 32, color: 'orange', left: -10, top: -20, position: 'absolute' }

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        center={center}
        zoom={zoom}
        onChange={this.handleChange}
        onDrag={this.onDrag}
      >
      {
        locations.map((loc, i) => 
          <Icon
            key={loc.id}
            lat={loc.latitude}
            lng={loc.longitude}
            type="environment"
            theme="filled"
            style={ loc.id === focusedLocation? focusedStyle: style }
            twoToneColor="#79a2b5"
          />
        )
      }
        <Icon type='environment' theme="filled" style={{ fontSize: 24, color: 'red' }} lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    )
  }
}

//'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
//'http://maps.google.com/mapfiles/ms/icons/red-dot.png'

MyMap.propTypes = {
  center:              PropTypes.object.isRequired,
  zoom:                PropTypes.number.isRequired,
  locations:           PropTypes.array.isRequired,
  focusedLocation:     PropTypes.string.isRequired,
  onCenterChange:      PropTypes.func,
  onZoomChange:        PropTypes.func,
}

export default MyMap
