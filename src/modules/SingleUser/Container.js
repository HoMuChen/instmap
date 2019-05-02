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
  getUser,
  changeLoading,
  changeDisplay,
  fchMedias,
  clearMedias,
} from './Actions';

class Location extends React.Component {
  componentDidMount() {
    sendPageview(`/users/${this.props.id}`);

    this.props.changeLoading('user', true);
    this.props.changeLoading('media', true);

    this.props.getUser(this.props.id);
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
      user,
      isLoadingLocation,
      isLoadingMedia,
      medias,
      display,
    } = this.props;

    if(!user) return null;

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
                  <Tooltip title='相片地圖(尚未開放)'>
                    <Icon type="environment" onClick={this.handleChangeDisplay(2)} />
                  </Tooltip>,
                  <Tooltip title='收藏此用戶(尚未開放)'>
                    <Icon type="book" />
                  </Tooltip>
                ]}
              >
                <Card.Meta
                  key={id}
                  title={<a target='blank' href={`https://instagram.com/${user.get('username')}`}>{user.get('full_name')}</a>}
                  description={`紛絲數: ${user.get('fans_count')}, 貼文數: ${user.get('media_count')}`}
                  avatar={<Avatar style={{ width: 48, height: 48 }} src={user.get('profile_pic_url')}/>}
                />
                <div style={{ marginTop: 12 }}>{ user.get('biography') }</div>
              </Card>
        }
        <InfiniteMedias
          module='users'
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
    user:               state.getIn(['singleUser', 'user']),
    medias:             state.getIn(['singleUser', 'medias']),
    from:               state.getIn(['singleUser', 'config', 'from']),
    hasNextPage:        state.getIn(['singleUser', 'config', 'hasNextPage']),
    isLoadingLocation:  state.getIn(['singleUser', 'config', 'isLoading', 'user']),
    isLoadingMedia:     state.getIn(['singleUser', 'config', 'isLoading', 'media']),
    display:            state.getIn(['singleUser', 'config', 'display']),
  }), {
    getUser,
    changeLoading,
    changeDisplay,
    fchMedias,
    clearMedias,
  }
)(Location);
