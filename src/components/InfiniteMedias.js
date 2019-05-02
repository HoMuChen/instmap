import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import {
  Card,
  Skeleton,
  BackTop,
  Row,
  Col,
  Avatar,
} from 'antd';

class InfiniteMedias extends PureComponent {

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
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight + 10) >= scrollHeight;

    if (scrolledToBottom && !this.props.isLoading) {
      this.props.onLoadMore();
    }
  };

  render() {
    const {
      module,
      data,
      display,
      isLoading,
    } = this.props;

    const isXS = window.matchMedia("(max-width: 576px)").matches;

    return (
      <React.Fragment>
        <Row type='flex' gutter={{ xs: 8, sm: 16 }}>
          {
            display === 0 &&
            data.valueSeq().map((media, url) => (
              <Col key={url} span={8} style={{ marginBottom: isXS? 8: 16 }}>
                <div style={{ width: '100%', overFlow: 'hidden', position: 'relative', paddingBottom: '100%' }}>
                  <a target='_blank' rel="noopener noreferrer" href={media.get('url')}>
                    <img alt='...'
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        left: 0,
                        top: 0
                      }}
                      src={media.get('image_url')}
                    />
                  </a>
                </div>
              </Col>
            ))
          }
        </Row>
          {
            display === 1 &&
            data.valueSeq().map((media, url) => (
              <Card
                key={url}
                style={{ marginBottom: 8 }}
              >
                <Card.Meta
                  title={`
                    ${media.get('like_count')}個讚, ${media.get('comment_cout')}個回覆, ${module === 'users'? media.get('location_name'): ''}
                  `}
                  description={DateTime.fromSeconds(media.get('tm')).toFormat('FF')}
                  avatar={
                    <a target='_blank' rel="noopener noreferrer" href={media.get('url')}>
                      <Avatar style={{ width: 48, height: 48 }} src={media.get('image_url')} />
                    </a>
                  }
                />
                <div style={{ marginTop: 12 }}>{ media.get('description') || "..." }</div>
              </Card>
            ))
          }
        { isLoading && <Card><Skeleton /></Card> }
        <BackTop />
      </React.Fragment>
    )
  }
}

InfiniteMedias.propTypes = {
  module:                PropTypes.string.isRequired,
  data:                  PropTypes.object.isRequired,
  display:               PropTypes.number.isRequired,
  isLoading:             PropTypes.bool.isRequired,
  onLoadMore:            PropTypes.func.isRequired,
}

export default InfiniteMedias;
