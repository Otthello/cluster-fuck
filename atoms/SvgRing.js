import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgRingGeometryHelpers from './SvgRingGeometryHelpers';

class SvgRing extends Component {
  static propTypes = {
    strokeWidth: PropTypes.number,
    fillPercent: PropTypes.number,
    fillColor: PropTypes.string,
    emptyColor: PropTypes.string,
  };

  static defaultProps = {
    fillColor: '#427eec',
    emptyColor: '#ccc',
  };

  constructor(props) {
    super(props);

    this.state = {
      leftEndX: null,
      leftEndY: null,
      rightEndX: null,
      rightEndY: null,
    };
  }

  componentWillMount() {
    if (this.props.fillPercent) {
      this.buildArc(this.props.fillPercent);
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextPercent = nextProps.fillPercent;
    const currentPercent = this.props.fillPercent;

    if (nextPercent !== currentPercent) {
      this.buildArc(nextPercent);
    }
  }

  buildArc(percent) {
    const [left, right] = percent > 50 ? [50 - percent, 50] : [null, percent];

    this.calculateRightCoords(right);
    this.calculateLeftCoords(left);
  }

  calculateRightCoords(percent) {
    const [rightEndX, rightEndY] = SvgRingGeometryHelpers.calculateRight(percent);

    this.setState({ rightEndX, rightEndY });
  }

  calculateLeftCoords(percent) {
    if (percent !== null) {
      const [leftEndX, leftEndY] = SvgRingGeometryHelpers.calculateLeft(Math.abs(percent));

      this.setState({ leftEndX, leftEndY });
    } else {
      this.setState({ leftEndX: null, leftEndY: null });
    }
  }

  render() {
    const { leftEndX, leftEndY, rightEndX, rightEndY } = this.state;
    const { strokeWidth, fillColor, emptyColor } = this.props;

    return (
      <svg
        style={{
          width: '100%',
          height: '100%',
          align: 'none',
          overflow: 'visible',
          marginTop: `${strokeWidth / 2}px`,
        }}
        viewBox="0 0 200 200"
      >
        <circle
          style={{
            stroke: emptyColor,
            strokeWidth,
            fill: 'transparent',
          }}
          cx="100"
          cy="100"
          r="96"
        />
        <path
          d={`M 100,4 A 96,96 0 0,1 ${rightEndX}, ${rightEndY}`}
          style={{
            stroke: fillColor,
            strokeWidth,
            fill: 'transparent',
          }}
        />
        {leftEndX &&
          leftEndY && [
            <path
              d={`M 100,196 A 96,96 0 0,1 ${leftEndX}, ${leftEndY}`}
              style={{
                stroke: fillColor,
                strokeWidth,
                fill: 'transparent',
              }}
            />,
            <circle
              style={{
                fill: fillColor,
              }}
              cx="100"
              cy="196"
              r={strokeWidth / 2}
            />,
          ]}
        <circle
          style={{
            fill: fillColor,
          }}
          cx="100"
          cy="4"
          r={strokeWidth / 2}
        />
        <circle
          style={{
            fill: fillColor,
          }}
          cx={!leftEndX ? rightEndX : leftEndX}
          cy={!leftEndY ? rightEndY : leftEndY}
          r={strokeWidth / 1.5}
        />
      </svg>
    );
  }
}

export default SvgRing;
