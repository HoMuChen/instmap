import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Slider,
} from 'antd';

class RangeSlider extends PureComponent {

  componentDidMount() {
  }

  render() {
    const {
      min,
      max,
      value,
      onRangeChange,
    } = this.props;

    return (
      <React.Fragment>
        <Card style={{ marginBottom: 12 }}>
          { `粉絲數: ${value[0]} ~ ${value[1]}`}
          <Slider
            range
            marks={{ 1000000: '100萬', 500000: '50萬', 100000: '10萬', 50000: '5萬', 1000: '1千' }}
            min={min}
            max={max}
            defaultValue={value}
            onAfterChange={onRangeChange}
          />
        </Card>
      </React.Fragment>
    )
  }
}

RangeSlider.propTypes = {
  min:            PropTypes.number.isRequired,
  max:            PropTypes.number.isRequired,
  value:          PropTypes.array.isRequired,
  onRangeChange:  PropTypes.func.isRequired,
}

export default RangeSlider;
