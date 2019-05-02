import React from 'react';
import { connect } from 'react-redux';

import {
  Card,
  Avatar,
  Icon,
  Skeleton,
  Tooltip,
} from 'antd'

import { sendPageview } from '../../utils/ga';
import InfiniteMedias from '../../components/InfiniteMedias';

import {
  getLocation,
  changeLoading,
  changeDisplay,
  fchMedias,
  clearMedias,
} from './Actions';

class Location extends React.Component {
  componentDidMount() {
    sendPageview(`/location/${this.props.id}`);

    this.props.changeLoading('location', true);
    this.props.changeLoading('media', true);

    this.props.getLocation(this.props.id);
    this.props.fchMedias(this.props.id);
  }

  componentWillUnmount() {
    this.props.clearMedias();
  }

  handleLoadMore = () => {
    if(this.props.hasNextPage) {
      this.props.changeLoading('media', true);
      this.props.fchMedias(this.props.id, this.props.from);
    }
  }

  handleChangeDisplay = (type) => () => {
    this.props.changeDisplay(type);
  }

  render() {
    const {
      id,
      location,
      isLoadingLocation,
      isLoadingMedia,
      medias,
      display,
    } = this.props;

    if(!location) return null;

    return (
      <React.Fragment>
        {
          isLoadingLocation
            ? <Card style={{ marginBottom: 12 }}><Skeleton /></Card>
            : <Card
                style={{ marginBottom: 12 }}
                actions={[
                  <Icon type="appstore" onClick={this.handleChangeDisplay(0)} />,
                  <Icon type="bars" onClick={this.handleChangeDisplay(1)} />,
                  <Tooltip title='收藏此地點(尚未開放)'><Icon type="book" /></Tooltip>
                ]}
              >
                <Card.Meta
                  key={id}
                  title={location.get('name')}
                  description={`文章數: ${location.get('media_count')}`}
                  avatar={<Avatar style={{ width: 48, height: 48 }} src={location.get('profile_pic_url')}/>}
                />
              </Card>
        }
        <InfiniteMedias
          module='locations'
          data={medias}
          display={display}
          isLoading={isLoadingMedia}
          onLoadMore={this.handleLoadMore}
        />
      </React.Fragment>
    )
  }
}

export default connect(
  (state, props) => ({
    id:                 props.match.params.id,
    location:           state.getIn(['location', 'location']),
    medias:             state.getIn(['location', 'medias']),
    from:               state.getIn(['location', 'config', 'from']),
    hasNextPage:        state.getIn(['location', 'config', 'hasNextPage']),
    isLoadingLocation:  state.getIn(['location', 'config', 'isLoading', 'location']),
    isLoadingMedia:     state.getIn(['location', 'config', 'isLoading', 'media']),
    display:            state.getIn(['location', 'config', 'display']),
  }), {
    getLocation,
    changeLoading,
    changeDisplay,
    fchMedias,
    clearMedias,
  }
)(Location);
