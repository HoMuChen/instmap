import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  Skeleton,
  BackTop,
  Avatar,
} from 'antd';

class InfiniteArticleList extends PureComponent {

  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !this.props.isLoading) {
      this.props.onLoadMore();
    }

    if(this.props.changeFocusedIndex) {
      this.props.changeFocusedIndex( Math.floor((scrollTop+40)/106), this.props.data );
    }
  };

  handleOnHover = (id) => () => {
    this.props.changeFocusedLocation(id);
  }

  render() {
    const {
      data,
      focusedLocation,
      isLoading,
      isShowDist,
    } = this.props;

    const style = { marginBottom: 12 };
    const shadowStyle = { marginBottom: 12, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' };

    return (
      <React.Fragment>
        { 
          data.toJS().map((item, i) => (
            <Card
              key={i}
              style={item.id === focusedLocation? shadowStyle: style}
              onMouseEnter={this.handleOnHover(item.id)}
              hoverable
            >
              <Card.Meta
                title={<Link to={'/locations/'+item.id}>{item.name}</Link>}
                description={
                  <div>
                    <span>{`文章數: ${item.media_count}`}</span>
                    { isShowDist && <span>{`, 距離: ${item.dist} 公尺`}</span> }
                  </div>
                }
                avatar={<Avatar style={{ width: 48, height: 48 }} src={item.profile_pic_url} />}
              />
            </Card>
          ))
        }
        { isLoading && <Card><Skeleton /></Card> }
        <BackTop />
      </React.Fragment>
    )
  }
}

InfiniteArticleList.propTypes = {
  data:                  PropTypes.array.isRequired,
  focusedLocation:       PropTypes.string.isRequired,
  isLoading:             PropTypes.bool.isRequired,
  isShowDist:            PropTypes.bool.isRequired,
  onLoadMore:            PropTypes.func.isRequired,
  changeFocusedLocation: PropTypes.func,
  changeFocusedIndex:    PropTypes.func,
}

export default InfiniteArticleList;
