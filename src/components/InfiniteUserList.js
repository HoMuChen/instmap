import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  Skeleton,
  BackTop,
  Avatar,
} from 'antd';

class InfiniteUserList extends PureComponent {

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
    if(this.props.changeFocusedLocation) {
      this.props.changeFocusedLocation(id);
    }
  }

  render() {
    const {
      data,
      focusedLocation,
      isLoading,
    } = this.props;

    const style = { marginBottom: 12 };
    const shadowStyle = { marginBottom: 12, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' };

    return (
      <React.Fragment>
        { 
          data.toJS().map((item, i) => (
            <Link to={'/users/'+item.id}>
              <Card
                key={i}
                style={item.id === focusedLocation? shadowStyle: style}
                onMouseEnter={this.handleOnHover(item.id)}
                hoverable
              >
                <Card.Meta
                  title={item.full_name}
                  description={
                    <div>
                      <span>{`粉絲數: ${item.fans_count}, `}</span>
                      <span>{`貼文數: ${item.media_count} `}</span>
                    </div>
                  }
                  avatar={<Avatar style={{ width: 48, height: 48 }} src={item.profile_pic_url} />}
                />
                <div style={{ marginTop: 12 }}>{ item.biography }</div>
              </Card>
            </Link>
          ))
        }
        { isLoading && <Card><Skeleton /></Card> }
        <BackTop />
      </React.Fragment>
    )
  }
}

InfiniteUserList.propTypes = {
  data:                  PropTypes.object.isRequired,
  focusedLocation:       PropTypes.string,
  isLoading:             PropTypes.bool.isRequired,
  onLoadMore:            PropTypes.func.isRequired,
  changeFocusedLocation: PropTypes.func,
  changeFocusedIndex:    PropTypes.func,
}

export default InfiniteUserList;
