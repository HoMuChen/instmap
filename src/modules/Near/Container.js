import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'antd';

import { sendPageview } from '../../utils/ga';
import InfiniteArticleList from '../../components/InfiniteArticleList';
import MyMap from '../../components/MyMap';

import {
  fchLocations,
  changeCenter,
  changeZoom,
  changeFocusedLocation,
  changeFocusedIndex,
} from './Actions';

class NearestLocations extends React.Component {

  componentDidMount() {
    sendPageview('/near');

    const { locations, center, distance, limit, page } = this.props;

    if(locations.size === 0) {
      this.props.fchLocations(center.get('lat'), center.get('lng'), distance, limit, page);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.center !== this.props.center) {
      this.props.fchLocations(
        nextProps.center.get('lat'),
        nextProps.center.get('lng'),
        nextProps.distance,
        nextProps.limit,
        nextProps.page,
      );
    }
  }

  handleLoadMore = () => {
    const { center, distance, limit, page, hasNextPage } = this.props;

    if(hasNextPage) {
      this.props.fchLocations(center.get('lat'), center.get('lng'), distance, limit, page);
    }
  }

  handleUserPosition = () => {
    if(!navigator.geolocation) {
      alert('此瀏覽器不支援地理位置資訊')
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.props.changeCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }

  render() {
    const {
      locations,
      focusedLocation,
      isLoading,
      zoom,
      center,
      changeCenter,
      changeZoom,
    } = this.props;

    const data = locations.valueSeq();

    return (
      <React.Fragment>
        <div style={{ height: 250, position: 'fixed', maxWidth: 720, width: '100%', top: 64, zIndex:100 }}>
          <MyMap
            center={center.toJS()}
            zoom={zoom}
            locations={data.toJS()}
            focusedLocation={focusedLocation}
            onCenterChange={changeCenter}
            onZoomChange={changeZoom}
          />
          <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
            <Icon type='environment' theme="filled" style={{ fontSize: 24, color: 'red' }}/>
          </div>
          <div
            onClick={this.handleUserPosition}
            style={{
              backgroundColor: '#fff',
              width: 40,
              height: 40,
              position: 'absolute',
              bottom: 125,
              right: 10,
              padding: 7
            }}
          >
            <Icon type='user' style={{ fontSize: 24, color: '#555' }}/>
          </div>
        </div>
        <div style={{ marginTop: 250 }}>
          <InfiniteArticleList
            data={data}
            isShowDist={true}
            focusedLocation={focusedLocation}
            isLoading={isLoading}
            onLoadMore={this.handleLoadMore}
            changeFocusedLocation={this.props.changeFocusedLocation}
            changeFocusedIndex={this.props.changeFocusedIndex}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default connect(
  (state) => ({
    locations:       state.getIn(['near', 'locations']),
    focusedLocation: state.getIn(['near', 'config', 'focusedLocation']),
    center:          state.getIn(['near', 'config', 'center']),
    zoom:            state.getIn(['near', 'config', 'zoom']),
    isLoading:       state.getIn(['near', 'config', 'isLoading']),
    distance:        state.getIn(['near', 'config', 'distance']),
    limit:           state.getIn(['near', 'config', 'limit']),
    page:            state.getIn(['near', 'config', 'page']),
    hasNextPage:     state.getIn(['near', 'config', 'hasNextPage']),
  }), {
    fchLocations,
    changeCenter,
    changeZoom,
    changeFocusedLocation,
    changeFocusedIndex,
  }
)(NearestLocations);
