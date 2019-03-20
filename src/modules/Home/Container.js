import React from 'react';
import { connect } from 'react-redux';

import InfiniteArticleList from '../../components/InfiniteArticleList';

import {
  fchLocations,
  changeLoading,
} from './Actions';

class Home extends React.Component {
  componentDidMount() {
    if(this.props.locations.size === 0) {
      this.props.fchLocations(10);
    }
  }

  handleLoadMore = () => {
    this.props.changeLoading(true);
    this.props.fchLocations(10, this.props.lastEvaluated);
  }

  render() {
    const {
      locations,
      isLoading,
    } = this.props;

    return (
      <InfiniteArticleList
        data={locations.valueSeq()}
        isShowDist={false}
        isLoading={isLoading}
        onLoadMore={this.handleLoadMore}
      />
    )
  }
}

export default connect(
  state => ({
    locations:       state.getIn(['home', 'locations']),
    isLoading:       state.getIn(['home', 'config', 'isLoading']),
    lastEvaluated:   state.getIn(['home', 'config', 'lastEvaluated']),
  }), {
    fchLocations,
    changeLoading,
  }
)(Home);
