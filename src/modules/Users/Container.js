import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import RangeSlider from '../../components/RangeSlider';
import InfiniteUserList from '../../components/InfiniteUserList';

import { sendPageview } from '../../utils/ga';

import {
  fchUsers,
  changeLoading,
  changeFansRange,
} from './Actions';

class Users extends React.Component {
  componentDidMount() {
    sendPageview('/users')

    if(this.props.users.size === 0) {
      this.props.fchUsers(10, this.props.lastEvaluated);
    }
  }

  handleLoadMore = () => {
    if (this.props.hasNextPage) {
      this.props.changeLoading(true);
      this.props.fchUsers(10, this.props.lastEvaluated);
    }
  }

  handleRangeChange = (value) => {
    this.props.changeFansRange(value);

    this.props.changeLoading(true);
    this.props.fchUsers(10, value[1]);
  }

  render() {
    const {
      users,
      isLoading,
      range,
    } = this.props;

    return (
      <Fragment>
        <RangeSlider
          min={1000}
          max={100000}
          value={range.toJS()}
          onRangeChange={this.handleRangeChange}
        />
        <InfiniteUserList
          data={users.valueSeq()}
          isShowDist={false}
          isLoading={isLoading}
          onLoadMore={this.handleLoadMore}
        />
      </Fragment>
    )
  }
}

export default connect(
  state => ({
    users:           state.getIn(['users', 'users']),
    isLoading:       state.getIn(['users', 'config', 'isLoading']),
    hasNextPage:     state.getIn(['users', 'config', 'hasNextPage']),
    lastEvaluated:   state.getIn(['users', 'config', 'lastEvaluated']),
    range:           state.getIn(['users', 'config', 'range']),
  }), {
    fchUsers,
    changeLoading,
    changeFansRange,
  }
)(Users);
